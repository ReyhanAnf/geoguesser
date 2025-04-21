'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PlayerNameInput from '@/components/PlayerNameInput';
import MapComponent from '@/components/MapComponent';

// ... copy all the existing game logic, state, and functions here ...

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

  // ... copy all the existing functions here ...

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
          <>
            {/* ... rest of the existing JSX ... */}
            <MapComponent
              userGuess={userGuess}
              currentLocation={currentLocation}
              gameState={gameState}
              onMapClick={handleMapClick}
            />
            {/* ... rest of the existing JSX ... */}
          </>
        )}
      </div>
    </div>
  );
} 