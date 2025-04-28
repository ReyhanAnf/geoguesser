'use client';

import { useEffect, useState } from 'react';

export default function GoogleMapsScript() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps script loaded');
        setIsLoaded(true);
      };
      script.onerror = (error) => {
        console.error('Error loading Google Maps script:', error);
      };
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  return null;
} 