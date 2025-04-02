import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

// Default center (San Francisco)
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194
};

const MapView = ({ selectedProfile }) => {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
  });

  // Update map center when a profile is selected
  useEffect(() => {
    if (selectedProfile && selectedProfile.address.coordinates) {
      const { latitude, longitude } = selectedProfile.address.coordinates;
      setCenter({ lat: latitude, lng: longitude });
      setActiveMarker(selectedProfile.id);
    }
  }, [selectedProfile]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMarkerClick = (profileId) => {
    setActiveMarker(profileId === activeMarker ? null : profileId);
  };

  if (loadError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>Error loading Google Maps: {loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Location Map</h2>
        {selectedProfile ? (
          <p className="text-gray-600 mt-1">
            Showing: {selectedProfile.name} - {selectedProfile.address.city}, {selectedProfile.address.state}
          </p>
        ) : (
          <p className="text-gray-600 mt-1">Select a profile to view on the map</p>
        )}
      </div>
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {selectedProfile && selectedProfile.address.coordinates && (
          <Marker
            position={{
              lat: selectedProfile.address.coordinates.latitude,
              lng: selectedProfile.address.coordinates.longitude
            }}
            onClick={() => handleMarkerClick(selectedProfile.id)}
          >
            {activeMarker === selectedProfile.id && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="p-2">
                  <h3 className="font-semibold">{selectedProfile.name}</h3>
                  <p className="text-sm">{selectedProfile.address.street}</p>
                  <p className="text-sm">
                    {selectedProfile.address.city}, {selectedProfile.address.state} {selectedProfile.address.zipcode}
                  </p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )}
      </GoogleMap>

      {!selectedProfile && (
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-gray-500 text-center">
            Click "Show on Map" on any profile card to view its location
          </p>
        </div>
      )}
    </div>
  );
};

export default MapView;
