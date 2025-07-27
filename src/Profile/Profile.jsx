
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ userType }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    if (!userId) {
      setError('User ID not found in localStorage.');
      return;
    }

    const endpoint = userType === 'supplier'
      ? `/api/supplier/${userId}`
      : `/api/buyer/${userId}`;

    axios.get(endpoint)
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load profile data.');
      });
  }, [userType, userId]);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {userType === 'supplier' ? 'Supplier Profile' : 'Buyer Profile'}
      </h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        {userType === 'supplier' && (
          <>
            <p><strong>Company:</strong> {profile.company}</p>
            <p><strong>Materials Supplied:</strong> {profile.materials?.join(', ')}</p>
          </>
        )}
        {userType === 'buyer' && (
          <>
            <p><strong>Organization:</strong> {profile.organization}</p>
            <p><strong>Interested Materials:</strong> {profile.interests?.join(', ')}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
