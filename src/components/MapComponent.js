'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for Leaflet marker icons
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

// Component to handle map click events
const MapClickHandler = ({ onMapClick }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleClick = (e) => {
      onMapClick(e.latlng);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);

  return null;
};

const MapComponent = ({ 
  center, 
  zoom, 
  onMapClick, 
  userGuess, 
  currentLocation,
  distance,
  accuracy
}) => {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {userGuess && (
          <Marker position={userGuess}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">Tebakan Anda</p>
                <p>Jarak: {distance.toFixed(1)} km</p>
                <p>Akurasi: {accuracy.toFixed(1)}%</p>
              </div>
            </Popup>
          </Marker>
        )}

        {currentLocation && (
          <Marker position={currentLocation}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">Lokasi Sebenarnya</p>
              </div>
            </Popup>
          </Marker>
        )}

        <MapClickHandler onMapClick={onMapClick} />
      </MapContainer>
    </div>
  );
};

export default MapComponent; 