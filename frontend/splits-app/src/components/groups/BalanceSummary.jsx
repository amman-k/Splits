import React, { useMemo } from 'react';

const BalanceSummary = ({ expenses, members, currentUserId }) => {
  const balances = useMemo(() => {
    console.log('--- Balance Calculation Start (New Logic) ---');
    const approvedExpenses = expenses.filter(e => e.status === 'approved');
    if (approvedExpenses.length === 0 || members.length === 0) {
      return null;
    }

    // Step 1: Calculate the net balance for each person.
    const netBalances = new Map();
    members.forEach(member => netBalances.set(member._id.toString(), 0));

    approvedExpenses.forEach(expense => {
      const payerId = expense.paidBy._id.toString();
      const amount = expense.amount;
      
      // Credit the person who paid.
      if (netBalances.has(payerId)) {
        netBalances.set(payerId, netBalances.get(payerId) + amount);
      }

      // --- THIS IS THE FIX ---
      // Recalculate the share on the frontend to ensure accuracy,
      // ignoring the potentially incorrect splitAmong from the database.
      const numMembers = members.length;
      if (numMembers === 0) return;
      const share = amount / numMembers;

      // Debit each member for their share of this expense.
      members.forEach(member => {
        const memberId = member._id.toString();
        if (netBalances.has(memberId)) {
            netBalances.set(memberId, netBalances.get(memberId) - share);
        }
      });
    });
    console.log('1. Final net balances:', Object.fromEntries(netBalances));


    // Step 2: Separate members into creditors (owed money) and debtors (owe money).
    const creditors = [];
    const debtors = [];
    netBalances.forEach((balance, userId) => {
      const memberInfo = members.find(m => m._id.toString() === userId);
      if (!memberInfo) return;

      if (balance > 0.01) {
        creditors.push({ ...memberInfo, balance });
      } else if (balance < -0.01) {
        debtors.push({ ...memberInfo, balance: -balance }); // Store debt as a positive number
      }
    });
    console.log('2a. Creditors:', creditors);
    console.log('2b. Debtors:', debtors);


    // Step 3: Simplify the debts by matching debtors to creditors.
    const transactions = [];
    let debtorIndex = 0;
    let creditorIndex = 0;

    while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
      const debtor = debtors[debtorIndex];
      const creditor = creditors[creditorIndex];
      const paymentAmount = Math.min(debtor.balance, creditor.balance);

      transactions.push({
        fromId: debtor._id.toString(),
        from: debtor.username,
        toId: creditor._id.toString(),
        to: creditor.username,
        amount: paymentAmount,
      });

      debtor.balance -= paymentAmount;
      creditor.balance -= paymentAmount;

      if (debtor.balance < 0.01) debtorIndex++;
      if (creditor.balance < 0.01) creditorIndex++;
    }
    console.log('3. All calculated transactions to settle group debt:', transactions);


    // Step 4: Filter transactions to only show those involving the current user.
    const currentUserIdStr = currentUserId.toString();
    const finalDebts = transactions.filter(t => t.fromId === currentUserIdStr || t.toId === currentUserIdStr);
    
    // Re-format for the UI
    const uiDebts = finalDebts.map(t => {
      if (t.fromId === currentUserIdStr) {
        return { from: 'You', to: t.to, amount: t.amount };
      } else {
        return { from: t.from, to: 'You', amount: t.amount };
      }
    });
    console.log('4. Debts involving current user:', uiDebts);
    console.log('--- Balance Calculation End ---');
    return uiDebts;

  }, [expenses, members, currentUserId]);

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
              <span className="text-red-400 font-semibold">Rs. {debt.amount.toFixed(2)}</span>
            </>
          ) : (
            <>
              <span className="text-green-400 font-semibold">{debt.from} owes</span>
              <span className="font-bold mx-2">You</span>
              <span className="text-green-400 font-semibold">Rs. {debt.amount.toFixed(2)}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BalanceSummary;
