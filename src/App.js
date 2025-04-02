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

// Sample data
import { sampleProfiles } from './data/sampleData';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const handleShowOnMap = (profile) => {
    setSelectedProfile(profile);
  };

  const handleAddProfile = (newProfile) => {
    const id = profiles.length > 0 ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
    const profileWithId = { ...newProfile, id };
    setProfiles([...profiles, profileWithId]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProfileList profiles={profiles} onShowOnMap={handleShowOnMap} />} />
            <Route path="/profile/:id" element={<ProfileDetail profiles={profiles} />} />
            <Route path="/map" element={<MapView selectedProfile={selectedProfile} />} />
            <Route path="/admin" element={<AdminPanel onAddProfile={handleAddProfile} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
