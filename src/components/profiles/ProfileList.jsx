import React, { useState } from 'react';
import ProfileCard from './ProfileCard';

const ProfileList = ({ profiles, onShowOnMap }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Get unique locations (cities) for filter dropdown
  const locations = [...new Set(profiles.map(profile => profile.address.city))].sort();

  // Filter profiles based on search term and location filter
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || profile.address.city === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-5">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-3">Profiles</h2>
        
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search profiles..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Profile cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} onShowOnMap={onShowOnMap} />
          ))
        ) : (
          <div className="col-span-full text-center py-6 sm:py-8">
            <p className="text-gray-500 mb-3">No profiles match your search criteria.</p>
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
