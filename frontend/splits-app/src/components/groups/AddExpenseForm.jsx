import axios from "axios";
import React, { useState } from "react";

const AddExpenseForm = ({ groupId, onExpenseAdded, onCancel }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || !amount) {
      setError("Please fill all the details");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const newExpense = {
        description,
        amount: parseFloat(amount),
        groupId,
        splitAmong: [],
      };
      await axios.post("/api/expenses", newExpense);
      onExpenseAdded();
    } catch (err) {
      const message = err.response?.data?.msg || "Failed to add expense.";
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-700 p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Add a New Expense</h3>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
            placeholder="e.g., Dinner"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
            placeholder="0.00"
            step="0.01"
            min="0.01"
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-gray-300 bg-gray-500 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800"
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  )
};

export default AddExpenseForm;
