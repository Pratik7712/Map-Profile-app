import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, onShowOnMap }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/profile/${profile.id}`);
  };

  // Get city label for the card
  const cityLabel = profile.address.city;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="relative overflow-hidden">
        <img 
          src={profile.photo} 
          alt={`${profile.name}`} 
          className="w-full h-48 sm:h-56 md:h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: '50% 25%' }}
        />
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md transition-all duration-300 group-hover:bg-orange-600">
          {cityLabel}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-3 sm:p-4 flex-grow flex flex-col bg-white">
        <h3 className="text-base sm:text-lg font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300">{profile.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{profile.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {profile.interests.slice(0, 3).map((interest, index) => (
            <span 
              key={index} 
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md transition-all duration-300 hover:bg-blue-100 hover:text-blue-700"
            >
              {interest}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-3 grid grid-cols-2 gap-2">
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 text-white text-xs py-1.5 sm:py-2 px-2 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="whitespace-nowrap">Details</span>
          </button>
          <button
            onClick={() => onShowOnMap(profile)}
            className="bg-green-600 text-white text-xs py-1.5 sm:py-2 px-2 rounded-md flex items-center justify-center transition-all duration-300 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="whitespace-nowrap">Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
