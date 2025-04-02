import React, { useState } from 'react';
import ProfileCard from './ProfileCard';

const ProfileList = ({ profiles, onShowOnMap }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const locations = [...new Set(profiles.map(profile => profile.address.city))].sort();

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          profile.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || profile.address.city === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Profiles</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} onShowOnMap={onShowOnMap} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No profiles found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
