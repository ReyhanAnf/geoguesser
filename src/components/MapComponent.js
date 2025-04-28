'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ 
  center = [0, 0], 
  zoom = 2, 
  onMapClick, 
  guessMarker = null,
  actualMarker = null,
  showGuessLine = false
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({
    guess: null,
    actual: null,
    line: null
  });

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstance.current = L.map(mapRef.current).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance.current);

    // Add click handler
    if (onMapClick) {
      mapInstance.current.on('click', (e) => {
        onMapClick([e.latlng.lat, e.latlng.lng]);
      });
    }

    return () => {
      mapInstance.current.remove();
    };
  }, []);

  // Update markers when props change
  useEffect(() => {
    if (!mapInstance.current) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => {
      if (marker) marker.remove();
    });

    // Add guess marker if provided
    if (guessMarker) {
      markersRef.current.guess = L.marker(guessMarker, {
        icon: L.divIcon({
          className: 'guess-marker',
          html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>'
        })
      }).addTo(mapInstance.current);
    }

    // Add actual marker if provided
    if (actualMarker) {
      markersRef.current.actual = L.marker(actualMarker, {
        icon: L.divIcon({
          className: 'actual-marker',
          html: '<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>'
        })
      }).addTo(mapInstance.current);
    }

    // Add line between markers if both exist and showGuessLine is true
    if (showGuessLine && guessMarker && actualMarker) {
      markersRef.current.line = L.polyline([guessMarker, actualMarker], {
        color: '#3b82f6',
        weight: 2,
        dashArray: '5, 10'
      }).addTo(mapInstance.current);
    }
  }, [guessMarker, actualMarker, showGuessLine]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg overflow-hidden"
    />
  );
};

export default MapComponent; 