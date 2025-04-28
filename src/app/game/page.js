'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import GlassButton from '@/components/GlassButton';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import GoogleMapsScript from '@/components/GoogleMapsScript';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
    </div>
  ),
});

const fallbackLocations = [
  {
    name: 'Eiffel Tower',
    country: 'France',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
    lat: 48.8584,
    lng: 2.2945
  },
  {
    name: 'Statue of Liberty',
    country: 'USA',
    image: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg',
    lat: 40.6892,
    lng: -74.0445
  },
  {
    name: 'Great Wall of China',
    country: 'China',
    image: 'https://images.pexels.com/photos/161401/famous-landmark-china-great-wall-of-china-161401.jpeg',
    lat: 40.4319,
    lng: 116.5704
  },
  {
    name: 'Taj Mahal',
    country: 'India',
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
    lat: 27.1751,
    lng: 78.0421
  },
  {
    name: 'Colosseum',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg',
    lat: 41.8902,
    lng: 12.4922
  }
];

export default function GamePage() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [distance, setDistance] = useState(null);
  const [userGuess, setUserGuess] = useState(null);

  useEffect(() => {
    loadNewLocation();
  }, []);

  const loadNewLocation = () => {
    const randomIndex = Math.floor(Math.random() * fallbackLocations.length);
    setCurrentLocation(fallbackLocations[randomIndex]);
    setShowResult(false);
    setUserGuess(null);
  };

  const handleGuess = (lat, lng) => {
    if (!currentLocation) return;

    setUserGuess({ lat, lng });

    const R = 6371; // Earth's radius in km
    const dLat = (lat - currentLocation.lat) * Math.PI / 180;
    const dLng = (lng - currentLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(currentLocation.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const calculatedDistance = R * c;

    setDistance(calculatedDistance);
    setShowResult(true);

    // Calculate score based on distance
    const points = Math.max(0, Math.round(5000 * Math.exp(-calculatedDistance / 2000)));
    setScore(prevScore => prevScore + points);

    if (round >= 5) {
      setGameOver(true);
    } else {
      setRound(prevRound => prevRound + 1);
    }
  };

  const handleNextLocation = () => {
    loadNewLocation();
  };

  const handleRestart = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setShowResult(false);
    setDistance(null);
    setUserGuess(null);
    loadNewLocation();
  };

  if (gameOver) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <GlassCard className="text-center">
            <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
            <p className="text-2xl mb-6">Your final score: {score}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton onClick={handleRestart}>Play Again</GlassButton>
              <Link href="/">
                <GlassButton>Back to Home</GlassButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <GoogleMapsScript />
        
        <GlassCard>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Round {round}/5</h2>
              <p className="text-lg">Score: {score}</p>
            </div>
            <Link href="/">
              <GlassButton>Exit Game</GlassButton>
            </Link>
          </div>
        </GlassCard>

        {currentLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard>
              <div className="aspect-video relative mb-4">
                <img
                  src={currentLocation.image}
                  alt={currentLocation.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{currentLocation.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{currentLocation.country}</p>
            </GlassCard>
          </motion.div>
        )}

        <GlassCard className="p-0 overflow-hidden">
          <MapComponent onGuess={handleGuess} />
        </GlassCard>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard>
              <h3 className="text-xl font-semibold mb-2">Your Guess</h3>
              <p className="mb-4">Distance: {distance.toFixed(1)} km</p>
              <GlassButton onClick={handleNextLocation}>
                {round < 5 ? 'Next Location' : 'Finish Game'}
              </GlassButton>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </main>
  );
} 