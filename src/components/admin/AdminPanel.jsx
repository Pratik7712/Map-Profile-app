import React, { useState } from 'react';
import ProfileForm from './ProfileForm';

const AdminPanel = ({ profiles, onAddProfile, onUpdateProfile, onDeleteProfile }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingProfile(null);
  };

  const handleEditClick = (profile) => {
    setIsAdding(false);
    setEditingProfile(profile);
  };

  const handleCancelForm = () => {
    setIsAdding(false);
    setEditingProfile(null);
  };

  const handleSubmitForm = (profileData) => {
    if (isAdding) {
      onAddProfile(profileData);
    } else if (editingProfile) {
      onUpdateProfile({ ...profileData, id: editingProfile.id });
    }
    setIsAdding(false);
    setEditingProfile(null);
  };

  const handleDeleteClick = (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      onDeleteProfile(profileId);
    }
  };

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        {!isAdding && !editingProfile && (
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add New Profile
          </button>
        )}
      </div>

      {(isAdding || editingProfile) ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isAdding ? 'Add New Profile' : 'Edit Profile'}
          </h2>
          <ProfileForm 
            initialData={editingProfile || {}} 
            onSubmit={handleSubmitForm} 
            onCancel={handleCancelForm} 
          />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search profiles..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map(profile => (
                    <tr key={profile.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={profile.photo} 
                              alt={profile.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                            <div className="text-sm text-gray-500">{profile.description.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{profile.address.city}</div>
                        <div className="text-sm text-gray-500">{profile.address.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{profile.contact.email}</div>
                        <div className="text-sm text-gray-500">{profile.contact.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(profile)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(profile.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No profiles found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
