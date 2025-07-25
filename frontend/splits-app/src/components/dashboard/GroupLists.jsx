import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Use the 'api' instance and the correct path
        const res = await axios.get('/api/groups');
        setGroups(res.data);
      } catch (err) {
        setError('Could not fetch groups.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading groups...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Your Groups</h2>
      {groups.length === 0 ? (
        <p className="text-gray-400">You are not a member of any groups yet.</p>
      ) : (
        <ul className="space-y-4">
          {groups.map((group) => (
            <li key={group._id}>
              <Link
                to={`/group/${group._id}`}
                className="block bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                <p className="text-sm text-gray-400">Join Code: {group.joinCode}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
