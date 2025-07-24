import React from "react";

const ExpenseList = ({
  expenses,
  groupOwnerId,
  currentUserId,
  onApprove,
  onReject,
}) => {
  const approvedExpenses = expenses.filter((e) => e.status === "approved");
  const pendingExpenses = expenses.filter((e) => e.status === "pending");
  const isOwner = groupOwnerId === currentUserId;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  return (
    <div>
      {/* Admin-only section for pending expenses */}
      {isOwner && pendingExpenses.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Pending Approval</h3>
          <ul className="space-y-3">
            {pendingExpenses.map(expense => (
              <li key={expense._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-white">{expense.description}</p>
                  <p className="text-sm text-gray-400">
                    Added by {expense.paidBy.username} on {formatDate(expense.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-white">${expense.amount.toFixed(2)}</span>
                  <button 
                    onClick={() => onApprove(expense._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors">
                    Approve
                  </button>
                  <button 
                    onClick={() => onReject(expense._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors">
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* List of approved expenses */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Approved Expenses</h3>
        {approvedExpenses.length > 0 ? (
          <ul className="space-y-3">
            {approvedExpenses.map(expense => (
              <li key={expense._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{expense.description}</p>
                  <p className="text-sm text-gray-400">Paid by {expense.paidBy.username}</p>
                </div>
                <span className="text-lg font-bold text-white">${expense.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No approved expenses yet.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
