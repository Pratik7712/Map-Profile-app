import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map from '../map/Map';

const ProfileDetail = ({ profiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const profile = profiles.find(p => p.id === parseInt(id, 10));
  
  // Handle case when profile is not found
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-red-600">Profile not found</h2>
        <p className="mt-4 text-gray-600">The profile you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Profiles
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/')} 
        className="mb-6 flex items-center text-blue-500 hover:text-blue-700"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Profiles
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={profile.photo} 
              alt={profile.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-gray-600 mt-2 text-lg">{profile.description}</p>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {profile.contact.email}
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  {profile.contact.phone}
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">Address</h2>
              <p className="mt-2 text-gray-600">
                {profile.address.street}<br />
                {profile.address.city}, {profile.address.state} {profile.address.zipcode}
              </p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">Interests</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
          <div className="h-64 rounded-lg overflow-hidden">
            <Map 
              profiles={[profile]} 
              selectedProfile={profile} 
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
