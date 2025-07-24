import React, { useContext, useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/layouts/Navbar';

const GroupDetailsPage = () => {
  const {id}=useParams();
  const user=useContext(AuthContext);
  const [group,setGroup]=useState(null);
  const [expense,setExpense]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

  useEffect(()=>{
    const fetchGroupDetails= async ()=>{
      try{
        const [groupRes,expenseRes]=await Promise.all([axios.post(`/api/groups/${id}`),axios.post(`api/expenses/group/${id}`)]);

        setGroup(groupRes.data);
        setExpense(expenseRes.data);
      }catch(err){
        setError('Could not fetch group details.');
        console.error(err);
      }finally {
        setLoading(false);
      }
    }
    fetchGroupDetails();
  },[id]);

  if(loading){
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
          {/* Header */}
          <div className="mb-8">
            <Link to="/dashboard" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
            <h1 className="text-4xl font-bold text-white">{group.name}</h1>
            <p className="text-gray-400 mt-2">Owned by: {group.owner.username}</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Expenses */}
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Expenses</h2>
              {/* --- TODO: Expense List and Add Expense Form will go here --- */}
              <div className="text-gray-400">Expense list will be shown here.</div>
            </div>

            {/* Right Column: Members & Balances */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Members</h2>
              <ul className="space-y-2">
                {group.members.map(member => (
                  <li key={member._id} className="text-gray-300">{member.username}</li>
                ))}
              </ul>
              <hr className="my-6 border-gray-700" />
              <h2 className="text-2xl font-bold mb-4">Balances</h2>
              {/* --- TODO: Balance summary will go here --- */}
              <div className="text-gray-400">Balance calculations will be shown here.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

}

export default GroupDetailsPage