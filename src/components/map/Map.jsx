import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const MapComponent = ({ profiles, selectedProfile, height = '500px' }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState({
    lat: 39.8283, // US center latitude
    lng: -98.5795  // US center longitude
  });
  const [zoom, setZoom] = useState(3);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Update map view when selectedProfile changes
  useEffect(() => {
    if (selectedProfile) {
      const newCenter = {
        lat: selectedProfile.address.coordinates.latitude,
        lng: selectedProfile.address.coordinates.longitude
      };
      setCenter(newCenter);
      setZoom(13);
      setActiveMarker(selectedProfile.id);
    }
  }, [selectedProfile]);

  const handleMarkerClick = (markerId) => {
    setActiveMarker(markerId);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  return (
    <div style={{ height: height, width: '100%' }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {/* Markers for each profile */}
          {profiles.map(profile => (
            <Marker
              key={profile.id}
              position={{
                lat: profile.address.coordinates.latitude,
                lng: profile.address.coordinates.longitude
              }}
              onClick={() => handleMarkerClick(profile.id)}
              icon={{
                url: selectedProfile && selectedProfile.id === profile.id
                  ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
            >
              {/* Info Window for active marker */}
              {activeMarker === profile.id && (
                <InfoWindow onCloseClick={handleInfoWindowClose}>
                  <div className="p-2">
                    <h3 className="font-semibold text-sm">{profile.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {profile.address.street}<br />
                      {profile.address.city}, {profile.address.state}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
          <p className="text-gray-500">Loading Map...</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
