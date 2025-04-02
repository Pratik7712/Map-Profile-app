import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, onShowOnMap }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/profile/${profile.id}`);
  };

  const cityLabel = profile.address.city;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img 
          src={profile.photo} 
          alt={profile.name} 
          className="w-full h-96 object-cover object-center transition-transform duration-500 group-hover:scale-110"
          style={{ objectPosition: '50% 25%' }}
        />
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-3 py-2 rounded-lg transition-all duration-500 group-hover:bg-orange-600">
          {cityLabel}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col bg-white">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-800 transition-colors duration-500">{profile.name}</h3>
        <p className="text-gray-600 text-base mt-2 line-clamp-2">{profile.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {profile.interests.slice(0, 3).map((interest, index) => (
            <span 
              key={index} 
              className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full transition-all duration-500 hover:bg-blue-100 hover:text-blue-800"
            >
              {interest}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 text-white text-base py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            View Details
          </button>
          <button
            onClick={() => onShowOnMap(profile)}
            className="bg-green-600 text-white text-base py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-500 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Show on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
