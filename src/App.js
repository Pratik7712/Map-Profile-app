import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/layout/Header';
import ProfileList from './components/profiles/ProfileList';
import ProfileDetail from './components/profiles/ProfileDetail';
import MapView from './components/map/MapView';
import AdminPanel from './components/admin/AdminPanel';
import NotFound from './components/layout/NotFound';

// Sample data (replace with API calls in a real application)
import { sampleProfiles } from './data/sampleData';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setProfiles(sampleProfiles);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load profiles. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler for showing a profile on the map
  const handleShowOnMap = (profile) => {
    setSelectedProfile(profile);
    // On mobile, show the map when a profile is selected
    if (window.innerWidth < 1024) {
      setShowMap(true);
    }
  };

  // Handler for adding a new profile
  const handleAddProfile = (newProfile) => {
    // Generate a new ID (in a real app, the backend would handle this)
    const id = profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
    const profileWithId = { ...newProfile, id };
    setProfiles([...profiles, profileWithId]);
  };

  // Handler for updating a profile
  const handleUpdateProfile = (updatedProfile) => {
    setProfiles(profiles.map(profile => 
      profile.id === updatedProfile.id ? updatedProfile : profile
    ));
  };

  // Handler for deleting a profile
  const handleDeleteProfile = (profileId) => {
    setProfiles(profiles.filter(profile => profile.id !== profileId));
    if (selectedProfile && selectedProfile.id === profileId) {
      setSelectedProfile(null);
    }
  };

  // Toggle map visibility on mobile
  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 m-3 sm:m-4 rounded-md" role="alert">
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <Routes>
              <Route path="/" element={
                <>
                  {/* Mobile Map Toggle Button */}
                  <div className="lg:hidden mb-4 flex justify-center">
                    <button
                      onClick={toggleMap}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                      {showMap ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Show Profiles
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Show Map
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Profiles Section - Hidden on mobile when map is shown */}
                    <div className={`lg:col-span-7 ${showMap ? 'hidden lg:block' : 'block'}`}>
                      <ProfileList 
                        profiles={profiles} 
                        onShowOnMap={handleShowOnMap} 
                      />
                    </div>
                    
                    {/* Map Section - Hidden on mobile when profiles are shown */}
                    <div className={`lg:col-span-5 lg:sticky lg:top-4 lg:self-start ${!showMap ? 'hidden lg:block' : 'block'}`}>
                      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                        <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-2 sm:mb-3">Location Map</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2">
                          {selectedProfile ? 
                            `Showing: ${selectedProfile.name}, ${selectedProfile.address.city}, ${selectedProfile.address.state}` : 
                            'Select a profile to view on map'}
                        </p>
                        <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-md overflow-hidden">
                          <MapView selectedProfile={selectedProfile} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              } />
              <Route path="/profile/:id" element={<ProfileDetail profiles={profiles} />} />
              <Route path="/admin" element={
                <AdminPanel 
                  profiles={profiles}
                  onAddProfile={handleAddProfile}
                  onUpdateProfile={handleUpdateProfile}
                  onDeleteProfile={handleDeleteProfile}
                />
              } />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
