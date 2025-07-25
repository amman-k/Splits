import React, { useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import GroupList from '../components/dashboard/GroupLists';
import CreateGroupModal from '../components/dashboard/CreateGroupModal';
import JoinGroupModal from '../components/dashboard/JoinGroupModal';
// Import the new CSS module
import styles from './DashboardPage.module.css';
// Import the icon from react-icons
import { FaArrowRight } from 'react-icons/fa';


const DashboardPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);
  const [groupListKey, setGroupListKey] = useState(Date.now());

  const handleGroupChange = () => {
    setGroupListKey(Date.now());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar />
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Action Buttons Area */}
          <div className="flex justify-end items-center mb-8 flex-wrap gap-6">
            {/* Create Group Button */}
            <button
              onClick={() => setCreateModalOpen(true)}
              className={`${styles.animatedButton} ${styles.createButton}`}
            >
              <span className={styles.text}>Create Group</span>
              <span className={styles.circle}></span>
            </button>

            {/* Join Group Button */}
            <button
              onClick={() => setJoinModalOpen(true)}
              className={`${styles.animatedButton} ${styles.joinButton}`}
            >
              <span className={styles.text}>Join Group</span>
              <span className={styles.circle}></span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="mt-6">
            <GroupList key={groupListKey} />
          </div>
        </div>
      </main>

      {/* Modals */}
      {isCreateModalOpen && (
        <CreateGroupModal 
          onClose={() => setCreateModalOpen(false)} 
          onGroupCreated={handleGroupChange}
        />
      )}
      
      {isJoinModalOpen && (
        <JoinGroupModal 
          onClose={() => setJoinModalOpen(false)}
          onGroupJoined={handleGroupChange}
        />
      )}
    </div>
  );
};

export default DashboardPage;
