import React, { useState } from 'react'
import axios from 'axios'

const JoinGroupModal = ({onClose,onGroupJoined}) => {
  const [joinCode,setJoinCode]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState('');

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!joinCode.trim()){
        setError('Join code cannot be empty');
        return;
    }
    setLoading(true);
    setError('');

    try{
        const res=await axios.post('/api/groups/join',{joinCode});
        onGroupJoined(res.data);
        onClose();
    }catch(err){
        const message = err.response?.data?.msg || 'Failed to join group.';
      setError(message);
      console.error(err);
    }finally{
        setLoading(false);
    }

  }


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Join an Existing Group</h2>
        
        {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="join-code" className="block mb-2 text-sm font-medium text-gray-300">
              Group Join Code
            </label>
            <input
              type="text"
              id="join-code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter 8-character code"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-gray-300 bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 disabled:bg-green-800 transition-colors"
            >
              {loading ? 'Joining...' : 'Join'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JoinGroupModal