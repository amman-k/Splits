import React, { useMemo } from "react";

const BalanceSummary = ({ expenses, members, currentUserId }) => {
  const balances = useMemo(() => {
    const approvedExpenses = expenses.filter((e) => e.status === "approved");
    if (approvedExpenses.length === 0 || members.length === 0) {
      return null;
    }

    const memberBalances = new Map(
      members.map((m) => [m._id, { ...m, balance: 0 }])
    );

    approvedExpenses.forEach((expense) => {
      const payerId = expense.paidBy._id;
      const amount = expense.amount;
      const numMembers = members.length;
      const share = amount / numMembers;

      if (memberBalances.has(payerId)) {
        memberBalances.get(payerId).balance += amount;
      }

      members.forEach((member) => {
        if (memberBalances.has(member._id)) {
          memberBalances.get(member._id).balance -= share;
        }
      });

      const currentUser = memberBalances.get(currentUserId);
      if (!currentUser) return [];

      const debts = [];
      memberBalances.forEach((member, memberId) => {
        if (memberId === currentUserId) return; // Skip self

        if (currentUser.balance > 0 && member.balance < 0) {
          const amount = Math.min(currentUser.balance, -member.balance);
          if (amount > 0.01) {
            debts.push({ from: member.username, to: "You", amount });
          }
        } else if (currentUser.balance < 0 && member.balance > 0) {
          const amount = Math.min(-currentUser.balance, member.balance);
          if (amount > 0.01) {
            debts.push({ from: "You", to: member.username, amount });
          }
        }
      });
      return debts;
    });
  },[members,expenses,currentUserId]);

  if (!balances || balances.length === 0) {
    return <p className="text-gray-400">Everyone is settled up!</p>;
  }

  return (
    <ul className="space-y-3">
      {balances.map((debt, index) => (
        <li key={index} className="flex items-center text-gray-300">
          {debt.from === 'You' ? (
            <>
              <span className="text-red-400 font-semibold">You owe</span>
              <span className="font-bold mx-2">{debt.to}</span>
              <span className="text-red-400 font-semibold">${debt.amount.toFixed(2)}</span>
            </>
          ) : (
            <>
              <span className="text-green-400 font-semibold">{debt.from} owes</span>
              <span className="font-bold mx-2">You</span>
              <span className="text-green-400 font-semibold">${debt.amount.toFixed(2)}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BalanceSummary;
