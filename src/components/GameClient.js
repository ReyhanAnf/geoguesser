'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PlayerNameInput from '@/components/PlayerNameInput';
import MapComponent from '@/components/MapComponent';

const fallbackLocations = [
  {
    name: "Monumen Nasional",
    country: "Indonesia",
    countryCode: "ID",
    continent: "Asia",
    location: { lat: -6.1754, lng: 106.8272 },
    clues: ["Monumen ikonik di ibukota Indonesia", "Terletak di pusat Jakarta", "Memiliki puncak yang dilapisi emas"],
    imageUrl: "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg"
  },
  // ... add more locations as needed
];

export default function GameClient() {
  const [playerName, setPlayerName] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userGuess, setUserGuess] = useState(null);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [gameState, setGameState] = useState('input');
  const [showLocationInfo, setShowLocationInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const [gameMode, setGameMode] = useState('relaxed');
  const [timeLeft, setTimeLeft] = useState(60);
  const [stats, setStats] = useState({
    totalGuesses: 0,
    highScore: 0,
    averageDistance: 0,
    accuracy: 0
  });

  useEffect(() => {
    // Load saved scores and stats from localStorage
    const savedScores = JSON.parse(localStorage.getItem('geoguesser_scores') || '[]');
    setScores(savedScores);
    
    const savedStats = JSON.parse(localStorage.getItem('geoguesser_stats') || '{}');
    setStats(savedStats);
  }, []);

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameState('playing');
    loadNewLocation();
  };

  const loadNewLocation = () => {
    setIsLoading(true);
    setUserGuess(null);
    setShowLocationInfo(false);

    // Get a random location from fallback locations
    const randomIndex = Math.floor(Math.random() * fallbackLocations.length);
    const newLocation = fallbackLocations[randomIndex];
    
    setCurrentLocation({
      ...newLocation,
      location: {
        lat: newLocation.location.lat,
        lng: newLocation.location.lng
      }
    });
    
    setIsLoading(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleMapClick = (latlng) => {
    if (gameState !== 'playing') return;
    
    setUserGuess(latlng);
    const dist = calculateDistance(
      latlng.lat,
      latlng.lng,
      currentLocation.location.lat,
      currentLocation.location.lng
    );
    
    setDistance(dist);
    const accuracy = Math.max(0, 100 - (dist / 100));
    const roundScore = Math.round(accuracy);
    
    setScore(prevScore => prevScore + roundScore);
    setGameState('result');
    setShowLocationInfo(true);
    
    // Update stats
    const newStats = {
      totalGuesses: stats.totalGuesses + 1,
      highScore: Math.max(stats.highScore, score + roundScore),
      averageDistance: ((stats.averageDistance * stats.totalGuesses) + dist) / (stats.totalGuesses + 1),
      accuracy: ((stats.accuracy * stats.totalGuesses) + accuracy) / (stats.totalGuesses + 1)
    };
    
    setStats(newStats);
    localStorage.setItem('geoguesser_stats', JSON.stringify(newStats));
  };

  const handleNextLocation = () => {
    if (gameMode === 'relaxed' && score >= 1000) {
      // Game over for relaxed mode
      const newScore = { name: playerName, score, date: new Date().toISOString() };
      const updatedScores = [...scores, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      setScores(updatedScores);
      localStorage.setItem('geoguesser_scores', JSON.stringify(updatedScores));
      setGameState('gameOver');
    } else {
      loadNewLocation();
      setGameState('playing');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-matcha-50">
      <div className="max-w-6xl mx-auto p-4">
        {gameState === 'input' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto"
          >
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">Pilih Mode Permainan</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameMode('relaxed')}
                className={`p-4 rounded-xl ${
                  gameMode === 'relaxed'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                <h3 className="font-semibold">Mode Santai</h3>
                <p className="text-sm">10 pertanyaan, hitung skor total</p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameMode('timed')}
                className={`p-4 rounded-xl ${
                  gameMode === 'timed'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                <h3 className="font-semibold">Mode Waktu</h3>
                <p className="text-sm">Tebak sebanyak mungkin dalam 60 detik</p>
              </motion.button>
            </div>
            <PlayerNameInput onStartGame={handleStartGame} />
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-emerald-800">
                Pemain: {playerName} | Skor: {score}
              </h2>
              {gameMode === 'timed' && (
                <div className="text-lg font-semibold text-emerald-600">
                  Waktu: {timeLeft}s
                </div>
              )}
            </div>
            
            <MapComponent
              center={[0, 0]}
              zoom={2}
              userGuess={userGuess}
              currentLocation={currentLocation?.location}
              gameState={gameState}
              onMapClick={handleMapClick}
              distance={distance}
              accuracy={Math.max(0, 100 - (distance / 100))}
            />

            {showLocationInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-bold text-emerald-800 mb-2">
                  {currentLocation.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {currentLocation.country} ({currentLocation.continent})
                </p>
                <p className="text-gray-600 mb-4">
                  Jarak: {distance.toFixed(1)} km | 
                  Akurasi: {Math.max(0, 100 - (distance / 100)).toFixed(1)}%
                </p>
                <button
                  onClick={handleNextLocation}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Lokasi Berikutnya
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 