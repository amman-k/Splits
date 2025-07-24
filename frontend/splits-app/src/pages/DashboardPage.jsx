import React, { useState } from 'react'
import Navbar from '../components/layouts/Navbar';
import GroupList from '../components/dashboard/GroupList';
import CreateGroupModal from '../components/dashboard/CreateGroupModal';
const DashboardPage = () => {
  const [isCreateModalOpen,setCreateModalOpen]=useState(false);
  const [isJoinModalOpen,setJoinModalOpen]=useState(false);
  const [groupListKey,setGroupListKey]=useState(Date.now());

  const handleGroupCreated =()=>{
    setGroupListKey(Date.now());
  };

  return (
     <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header and Action Buttons */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Group
              </button>
              <button
                onClick={() => setJoinModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Join Group
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="mt-6">
            <GroupList key={groupListKey} />
          </div>
        </div>
      </main>

      {/* Render the modal for creating a group */}
      {isCreateModalOpen && (
        <CreateGroupModal 
          onClose={() => setCreateModalOpen(false)} 
          onGroupCreated={handleGroupCreated}
        />
      )}
      
      {/* {isJoinModalOpen && <JoinGroupModal onClose={() => setJoinModalOpen(false)} />} */}
    </div>
  )
}

export default DashboardPage