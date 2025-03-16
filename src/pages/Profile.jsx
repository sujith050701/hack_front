// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://192.168.206.4:5000/api/profiles/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUser(response.data.data.user);
      } catch (err) {
        setError(err.message || 'Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">User not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-6">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-500">{user.name[0]}</span>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.userType}</p>
              {user.position && (
                <p className="text-gray-600">{user.position}</p>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            {user.bio && (
              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}

            {user.location && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Location</h2>
                <p className="text-gray-700">{user.location}</p>
              </div>
            )}

            {user.skills && user.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {user.userType === 'professional' && user.endorsements && user.endorsements.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Endorsements</h2>
                <div className="space-y-4">
                  {user.endorsements.map((endorsement) => (
                    <div
                      key={endorsement._id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{endorsement.skill}</h3>
                          {endorsement.institution && (
                            <p className="text-sm text-gray-600">
                              Endorsed by: {endorsement.institution.name}
                            </p>
                          )}
                          {endorsement.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {endorsement.description}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded text-sm ${
                          endorsement.status === 'verified' 
                            ? 'bg-green-100 text-green-800'
                            : endorsement.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {endorsement.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;