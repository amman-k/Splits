import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import AuthContext from '../context/AuthContext';
import ExpenseList from '../components/group/ExpenseList';
import AddExpenseForm from '../components/group/AddExpenseForm';

const GroupDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const fetchGroupDetails = async () => {
    try {
      const [groupRes, expensesRes] = await Promise.all([
        axios.get(`/api/groups/${id}`),
        axios.get(`/api/expenses/group/${id}`)
      ]);
      setGroup(groupRes.data);
      setExpenses(expensesRes.data);
    } catch (err) {
      setError('Could not fetch group details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [id]);

  const handleExpenseAdded = () => {
    setIsAddingExpense(false); // Hide form
    fetchGroupDetails(); // Refresh data
  };

  const handleApprove = async (expenseId) => {
    try {
      await axios.put(`/api/expenses/${expenseId}/approve`);
      fetchGroupDetails();
    } catch (err) {
      console.error('Failed to approve expense', err);
    }
  };

  const handleReject = async (expenseId) => {
    try {
      await axios.put(`/api/expenses/${expenseId}/reject`);
      fetchGroupDetails();
    } catch (err) {
      console.error('Failed to reject expense', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="text-center py-10">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="text-center py-10 text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/dashboard" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
            <h1 className="text-4xl font-bold text-white">{group.name}</h1>
            <p className="text-gray-400 mt-2">Owned by: {group.owner.username}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Expenses</h2>
                {!isAddingExpense && (
                  <button 
                    onClick={() => setIsAddingExpense(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Add Expense
                  </button>
                )}
              </div>

              {isAddingExpense && (
                <AddExpenseForm 
                  groupId={id}
                  onExpenseAdded={handleExpenseAdded}
                  onCancel={() => setIsAddingExpense(false)}
                />
              )}

              <ExpenseList 
                expenses={expenses}
                groupOwnerId={group.owner._id}
                currentUserId={user._id}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Members</h2>
              <ul className="space-y-2">
                {group.members.map(member => (
                  <li key={member._id} className="text-gray-300">{member.username}</li>
                ))}
              </ul>
              <hr className="my-6 border-gray-700" />
              <h2 className="text-2xl font-bold mb-4">Balances</h2>
              <div className="text-gray-400">Balance calculations will be shown here.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupDetailPage;
