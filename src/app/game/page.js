'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PlayerNameInput from '@/components/PlayerNameInput';

// Fix for Leaflet marker icons
const fixLeafletIcons = () => {
  if (typeof window !== 'undefined') {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }
};

// Komponen untuk menangani event map
function MapClickHandler({ onMapClick }) {
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
}

// Daftar lokasi default sebagai fallback
const fallbackLocations = [
  {
    name: 'Monumen Nasional',
    country: 'Indonesia',
    countryCode: 'ID',
    continent: 'Asia',
    coordinates: { lat: -6.1754, lng: 106.8272 },
    clue: 'Monumen setinggi 132 meter yang menjadi simbol kemerdekaan Indonesia',
    imageUrl: 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg'
  },
  {
    name: 'Menara Eiffel',
    country: 'Prancis',
    countryCode: 'FR',
    continent: 'Eropa',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    clue: 'Menara besi setinggi 324 meter yang menjadi ikon Paris',
    imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg'
  },
  {
    name: 'Great Wall of China',
    country: 'China',
    countryCode: 'CN',
    continent: 'Asia',
    coordinates: { lat: 40.4319, lng: 116.5704 },
    clue: 'The longest wall in the world, built over thousands of years',
    imageUrl: 'https://images.pexels.com/photos/161401/pexels-photo-161401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Taj Mahal',
    country: 'India',
    countryCode: 'IN',
    continent: 'Asia',
    coordinates: { lat: 27.1751, lng: 78.0421 },
    clue: 'White marble mausoleum built as a symbol of love',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Statue of Liberty',
    country: 'United States',
    countryCode: 'US',
    continent: 'North America',
    coordinates: { lat: 40.6892, lng: -74.0445 },
    clue: 'Symbol of freedom and democracy in New York',
    imageUrl: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Colosseum',
    country: 'Italy',
    countryCode: 'IT',
    continent: 'Europe',
    coordinates: { lat: 41.8902, lng: 12.4922 },
    clue: 'Ancient Roman amphitheater and symbol of Rome',
    imageUrl: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Sydney Opera House',
    country: 'Australia',
    countryCode: 'AU',
    continent: 'Oceania',
    coordinates: { lat: -33.8568, lng: 151.2153 },
    clue: 'Iconic building with shell-shaped roofs in Sydney',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sydney_Opera_House_-_Dec_2008.jpg/800px-Sydney_Opera_House_-_Dec_2008.jpg'
  },
  {
    name: 'Machu Picchu',
    country: 'Peru',
    countryCode: 'PE',
    continent: 'South America',
    coordinates: { lat: -13.1631, lng: -72.5450 },
    clue: 'Ancient Inca city in the Andes mountains',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/800px-Machu_Picchu%2C_Peru.jpg'
  },
  {
    name: 'Petra',
    country: 'Jordan',
    countryCode: 'JO',
    continent: 'Asia',
    coordinates: { lat: 30.3285, lng: 35.4444 },
    clue: 'Ancient city carved into rose-red rock',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Petra_Jordan_BW_21.JPG/800px-Petra_Jordan_BW_21.JPG'
  },
  {
    name: 'Christ the Redeemer',
    country: 'Brazil',
    countryCode: 'BR',
    continent: 'South America',
    coordinates: { lat: -22.9519, lng: -43.2106 },
    clue: 'Giant statue of Jesus overlooking Rio de Janeiro',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Christ_the_Redeemer_-_Cristo_Redentor.jpg/800px-Christ_the_Redeemer_-_Cristo_Redentor.jpg'
  }
];

async function fetchRandomLocation() {
  try {
    // 1. Pilih lokasi acak dari daftar fallback
    const locationInfo = fallbackLocations[Math.floor(Math.random() * fallbackLocations.length)];
    console.log('Selected location:', locationInfo.name);

    // 2. Terjemahkan teks ke Bahasa Indonesia menggunakan proxy
    const translateText = async (text) => {
      try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|id`);
        if (response.ok) {
          const data = await response.json();
          return data.responseData.translatedText || text;
        }
        return text;
      } catch (error) {
        console.error('Translation error:', error);
        return text;
      }
    };

    // Terjemahkan semua teks
    const [translatedName, translatedCountry, translatedContinent, translatedClue] = await Promise.all([
      translateText(locationInfo.name),
      translateText(locationInfo.country),
      translateText(locationInfo.continent),
      translateText(locationInfo.clue)
    ]);

    // Verifikasi URL gambar
    const verifyImage = async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok ? url : 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      } catch (error) {
        console.error('Image verification failed:', error);
        return 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      }
    };

    const verifiedImageUrl = await verifyImage(locationInfo.imageUrl);

    const result = {
      image: verifiedImageUrl,
      location: locationInfo.coordinates,
      name: translatedName,
      originalName: locationInfo.name,
      clue: translatedClue,
      continent: translatedContinent,
      country: translatedCountry,
      countryCode: locationInfo.countryCode,
      description: `Ini adalah ${translatedName}, salah satu landmark terkenal di dunia.`,
      photographer: 'Pexels',
      photographerUrl: 'https://www.pexels.com',
      imageUrl: verifiedImageUrl
    };

    console.log('Final location data:', result);
    return result;

  } catch (error) {
    console.error('Error in fetchRandomLocation:', error);
    // Coba lagi dengan lokasi berbeda
    return fetchRandomLocation();
  }
}

// Komponen untuk menampilkan feedback
const FeedbackMessage = ({ distance, score }) => {
  let message = '';
  let emoji = '';

  if (distance < 50) {
    message = 'Luar biasa! 🎯';
    emoji = '🎯';
  } else if (distance < 200) {
    message = 'Bagus sekali! 👍';
    emoji = '👍';
  } else if (distance < 500) {
    message = 'Bagus! 😊';
    emoji = '😊';
  } else if (distance < 1000) {
    message = 'Lumayan! 💪';
    emoji = '💪';
  } else if (distance < 5000) {
    message = 'Coba lagi! 🤔';
    emoji = '🤔';
  } else {
    message = 'Jauh banget! 😅';
    emoji = '😅';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-4"
    >
      <p className="text-2xl font-bold text-emerald-700">{message} {emoji}</p>
      <p className="text-lg text-emerald-600">Jarak: {distance} km</p>
      <p className="text-lg text-emerald-600">Skor: {score}</p>
    </motion.div>
  );
};

// Komponen untuk menampilkan leaderboard
const Leaderboard = ({ scores }) => {
  const topScores = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-emerald-800 mb-4">Papan Peringkat</h3>
      <div className="space-y-2">
        {topScores.map((score, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-2 bg-emerald-50/50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
              </span>
              <span className="font-semibold text-emerald-800">{score.playerName}</span>
            </div>
            <span className="font-bold text-emerald-700">{score.score}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Komponen untuk menampilkan fakta unik negara
const CountryFacts = ({ countryCode }) => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        const country = data[0];
        
        const interestingFacts = [
          `Ibu kota: ${country.capital?.[0] || 'Tidak diketahui'}`,
          `Populasi: ${country.population?.toLocaleString() || 'Tidak diketahui'} jiwa`,
          `Bahasa resmi: ${Object.values(country.languages || {}).join(', ') || 'Tidak diketahui'}`,
          `Mata uang: ${Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'Tidak diketahui'}`,
          `Wilayah: ${country.region || 'Tidak diketahui'}`
        ];
        
        setFacts(interestingFacts);
      } catch (error) {
        console.error('Error fetching country facts:', error);
        setFacts(['Tidak dapat memuat fakta tentang negara ini.']);
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, [countryCode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100"
    >
      <h3 className="text-lg font-semibold text-emerald-800 mb-2">Fakta Menarik:</h3>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-emerald-200 rounded w-3/4"></div>
          <div className="h-4 bg-emerald-200 rounded w-1/2"></div>
        </div>
      ) : (
        <ul className="space-y-1">
          {facts.map((fact, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-emerald-700"
            >
              • {fact}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

// Komponen untuk menampilkan statistik
const PlayerStats = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg"
    >
      <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-4">Statistik Anda</h3>
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        <div className="p-2 md:p-4 bg-emerald-50/50 rounded-lg">
          <p className="text-xs md:text-sm text-emerald-600">Total Tebakan</p>
          <p className="text-xl md:text-2xl font-bold text-emerald-800">{stats.totalGuesses}</p>
        </div>
        <div className="p-2 md:p-4 bg-emerald-50/50 rounded-lg">
          <p className="text-xs md:text-sm text-emerald-600">Skor Tertinggi</p>
          <p className="text-xl md:text-2xl font-bold text-emerald-800">{stats.highScore}</p>
        </div>
        <div className="p-2 md:p-4 bg-emerald-50/50 rounded-lg">
          <p className="text-xs md:text-sm text-emerald-600">Rata-rata Jarak</p>
          <p className="text-xl md:text-2xl font-bold text-emerald-800">{Math.round(stats.averageDistance)} km</p>
        </div>
        <div className="p-2 md:p-4 bg-emerald-50/50 rounded-lg">
          <p className="text-xs md:text-sm text-emerald-600">Persentase Benar</p>
          <p className="text-xl md:text-2xl font-bold text-emerald-800">{stats.accuracy.toFixed(1)}%</p>
        </div>
      </div>
    </motion.div>
  );
};

// Komponen untuk menampilkan gambar dengan efek hover dan parallax
const LocationImage = ({ imageUrl, name, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImage, setCurrentImage] = useState(imageUrl);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleImageError = () => {
    console.log('Image failed to load, using fallback');
    setCurrentImage('https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl shadow-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}
      <motion.img
        src={currentImage}
        alt={name}
        className="w-full h-96 object-cover transition-transform duration-300"
        style={{
          transform: isHovered 
            ? `scale(1.05) translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            : 'scale(1)',
        }}
        onLoad={() => setIsLoading(false)}
        onError={handleImageError}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-white text-xl font-bold">{name}</h3>
      </motion.div>
    </motion.div>
  );
};

// Komponen untuk animasi tebakan
const GuessAnimation = ({ isCorrect, distance }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!showAnimation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <motion.div
        className={`p-4 md:p-6 rounded-xl shadow-2xl max-w-[90%] md:max-w-md ${
          isCorrect ? 'bg-emerald-500' : 'bg-red-500'
        } text-white text-center`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 0.3,
        }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-1">
          {isCorrect ? 'Tebakan Tepat! 🎯' : 'Coba Lagi! 💪'}
        </h2>
        <p className="text-sm md:text-base">
          {isCorrect 
            ? `Hanya ${Math.round(distance)} km dari lokasi sebenarnya!`
            : 'Tebakan Anda masih terlalu jauh'}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Komponen untuk tombol dengan efek hover yang lebih menarik
const AnimatedButton = ({ children, onClick, className, type = 'primary' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    secondary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800',
  };

  return (
    <motion.button
      className={`${baseStyles[type]} ${className} relative overflow-hidden rounded-lg px-6 py-3 font-semibold`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.5 }}
      />
      {children}
    </motion.button>
  );
};

// Komponen untuk menampilkan loading animation
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center space-y-4"
  >
    <div className="relative w-16 h-16">
      <motion.div
        className="absolute inset-0 border-4 border-emerald-200 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-0 border-4 border-emerald-500 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
    <p className="text-emerald-600 font-medium">Memuat lokasi...</p>
  </motion.div>
);

// Komponen untuk menampilkan skor dengan animasi
const ScoreDisplay = ({ score, distance }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [displayDistance, setDisplayDistance] = useState(0);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setDisplayScore(prev => {
        const diff = score - prev;
        if (diff === 0) {
          clearInterval(scoreInterval);
          return prev;
        }
        return prev + Math.ceil(diff / 10);
      });
    }, 50);

    const distanceInterval = setInterval(() => {
      setDisplayDistance(prev => {
        const diff = distance - prev;
        if (diff === 0) {
          clearInterval(distanceInterval);
          return prev;
        }
        return prev + Math.ceil(diff / 10);
      });
    }, 50);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(distanceInterval);
    };
  }, [score, distance]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50/50 rounded-lg">
          <p className="text-sm text-emerald-600">Skor Anda</p>
          <p className="text-3xl font-bold text-emerald-800">{displayScore}</p>
        </div>
        <div className="p-4 bg-emerald-50/50 rounded-lg">
          <p className="text-sm text-emerald-600">Jarak</p>
          <p className="text-3xl font-bold text-emerald-800">{displayDistance} km</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function GamePage() {
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
    fixLeafletIcons();
    const savedScores = JSON.parse(localStorage.getItem('geoguesser_scores') || '[]');
    setScores(savedScores);
    
    const savedStats = JSON.parse(localStorage.getItem('geoguesser_stats') || '{}');
    setStats(savedStats);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && !currentLocation) {
      loadNewLocation();
    }
  }, [gameState, currentLocation]);

  const loadNewLocation = async () => {
    setIsLoading(true);
    try {
      // Get previously shown locations from localStorage
      const shownLocations = JSON.parse(localStorage.getItem('shownLocations') || '[]');
      
      // Filter out locations that have been shown recently
      const availableLocations = fallbackLocations.filter(
        loc => !shownLocations.includes(loc.name)
      );
      
      // If all locations have been shown, reset the list
      if (availableLocations.length === 0) {
        localStorage.setItem('shownLocations', '[]');
        const location = fallbackLocations[Math.floor(Math.random() * fallbackLocations.length)];
        setCurrentLocation({
          ...location,
          image: location.imageUrl,
          imageUrl: location.imageUrl,
          location: location.coordinates
        });
      } else {
        // Select a random location from available ones
        const randomLocation = availableLocations[Math.floor(Math.random() * availableLocations.length)];
        setCurrentLocation({
          ...randomLocation,
          image: randomLocation.imageUrl,
          imageUrl: randomLocation.imageUrl,
          location: randomLocation.coordinates
        });
        
        // Add the selected location to shown locations
        shownLocations.push(randomLocation.name);
        localStorage.setItem('shownLocations', JSON.stringify(shownLocations));
      }
    } catch (error) {
      console.error('Error loading location:', error);
      const randomLocation = fallbackLocations[Math.floor(Math.random() * fallbackLocations.length)];
      setCurrentLocation({
        ...randomLocation,
        image: randomLocation.imageUrl,
        imageUrl: randomLocation.imageUrl,
        location: randomLocation.coordinates
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (gameMode === 'timed' && gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('result');
    }
    return () => clearInterval(timer);
  }, [gameMode, gameState, timeLeft]);

  const updateStats = (newScore, newDistance) => {
    const newStats = {
      totalGuesses: stats.totalGuesses + 1,
      highScore: Math.max(stats.highScore, newScore),
      averageDistance: (stats.averageDistance * stats.totalGuesses + newDistance) / (stats.totalGuesses + 1),
      accuracy: ((stats.accuracy * stats.totalGuesses) + (newDistance < 100 ? 100 : 0)) / (stats.totalGuesses + 1)
    };
    setStats(newStats);
    localStorage.setItem('geoguesser_stats', JSON.stringify(newStats));
  };

  const handleStartGame = (name) => {
    setPlayerName(name);
    setGameState('playing');
    setTimeLeft(60);
  };

  const handleMapClick = (latlng) => {
    if (gameState === 'playing' && !isLoading) {
      setUserGuess(latlng);
    }
  };

  const handleGuess = () => {
    if (userGuess && currentLocation && currentLocation.location) {
      const calculatedDistance = calculateDistance(userGuess, currentLocation.location);
      setDistance(calculatedDistance);
      const newScore = calculateScore(calculatedDistance);
      setScore(prev => prev + newScore);
      updateStats(newScore, calculatedDistance);
      setGameState('result');
      saveScore(calculatedDistance);
    }
  };

  const calculateDistance = (point1, point2) => {
    const R = 6371; // Radius bumi dalam kilometer
    const φ1 = point1.lat * Math.PI/180;
    const φ2 = point2.lat * Math.PI/180;
    const Δφ = (point2.lat - point1.lat) * Math.PI/180;
    const Δλ = (point2.lng - point1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round(R * c); // Jarak dalam kilometer, dibulatkan ke bilangan bulat
  };

  const calculateScore = (distance) => {
    // Skor maksimum 5000
    // Skor berkurang berdasarkan jarak
    // - 0 km = 5000 poin
    // - 100 km = 4000 poin
    // - 1000 km = 3000 poin
    // - 5000 km = 1000 poin
    // - >5000 km = 0 poin
    const maxScore = 5000;
    const score = Math.max(0, maxScore - Math.floor(distance / 2));
    return Math.min(score, maxScore);
  };

  const saveScore = (distance) => {
    const scoreData = {
      playerName,
      score: calculateScore(distance),
      distance,
      location: currentLocation.name,
      date: new Date().toISOString(),
    };

    const newScores = [...scores, scoreData];
    setScores(newScores);
    localStorage.setItem('geoguesser_scores', JSON.stringify(newScores));
  };

  const handlePlayAgain = () => {
    setUserGuess(null);
    setScore(0);
    setDistance(0);
    setShowLocationInfo(false);
    setCurrentLocation(null);
    setTimeLeft(60);
    setGameState('playing');
  };

  if (gameState === 'input') {
    return <PlayerNameInput onStartGame={handleStartGame} />;
  }

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
            {gameMode === 'timed' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-800 font-semibold">Waktu Tersisa:</span>
                    <span className="text-2xl font-bold text-emerald-600">{timeLeft}s</span>
                  </div>
                  <div className="mt-2 h-2 bg-emerald-100 rounded-full">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: '100%' }}
                      animate={{ width: `${(timeLeft / 60) * 100}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6"
              >
                <h2 className="text-2xl font-bold mb-4 text-emerald-800">Foto Lokasi</h2>
                {isLoading ? (
                  <LoadingSpinner />
                ) : currentLocation && (
                  <>
                    <LocationImage
                      imageUrl={currentLocation.image}
                      name={currentLocation.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                      }}
                    />
                    <div className="mt-4 p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                      <p className="text-lg font-semibold text-emerald-700">Klue:</p>
                      <p className="text-emerald-800">{currentLocation.clue}</p>
                    </div>
                  </>
                )}

                {gameState === 'result' && currentLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-4"
                  >
                    <ScoreDisplay score={score} distance={distance} />
                    <FeedbackMessage distance={distance} score={score} />
                    <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                      <p className="text-lg font-semibold text-emerald-700">Lokasi Sebenarnya:</p>
                      <p className="text-xl font-bold text-emerald-800">{currentLocation.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <img 
                          src={`https://flagcdn.com/w40/${currentLocation.countryCode.toLowerCase()}.png`}
                          alt={`Bendera ${currentLocation.country}`}
                          className="w-6 h-4 rounded-sm shadow-sm"
                        />
                        <p className="text-emerald-800">{currentLocation.country}</p>
                      </div>
                      <p className="text-emerald-800">Benua: {currentLocation.continent}</p>
                      {showLocationInfo && (
                        <>
                          <p className="mt-2 text-emerald-800">{currentLocation.description}</p>
                          <div className="mt-4 text-sm text-emerald-600">
                            <p>Foto oleh: <a href={currentLocation.photographerUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">{currentLocation.photographer}</a></p>
                            <p>Sumber foto: <a href={currentLocation.imageUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Pexels</a></p>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <AnimatedButton
                        onClick={() => setShowLocationInfo(!showLocationInfo)}
                        type="secondary"
                        className="flex-1"
                      >
                        {showLocationInfo ? 'Sembunyikan Info' : 'Tampilkan Info Lengkap'}
                      </AnimatedButton>
                      <AnimatedButton
                        onClick={handlePlayAgain}
                        type="primary"
                        className="flex-1"
                      >
                        Main Lagi
                      </AnimatedButton>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6"
              >
                <h2 className="text-2xl font-bold mb-4 text-emerald-800">Peta Tebakan</h2>
                <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
                  <MapContainer
                    center={[0, 0]}
                    zoom={2}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {userGuess && (
                      <Marker position={[userGuess.lat, userGuess.lng]} />
                    )}
                    {gameState === 'result' && currentLocation && (
                      <Marker
                        position={[currentLocation.location.lat, currentLocation.location.lng]}
                        icon={L.divIcon({
                          className: 'actual-location-marker',
                          html: '📍',
                          iconSize: [30, 30],
                        })}
                      />
                    )}
                    <MapClickHandler onMapClick={handleMapClick} />
                  </MapContainer>
                </div>
                {userGuess && gameState === 'playing' && !isLoading && (
                  <AnimatedButton
                    onClick={handleGuess}
                    type="primary"
                    className="mt-4 w-full"
                  >
                    Tebak Lokasi Ini
                  </AnimatedButton>
                )}
              </motion.div>

              {gameState === 'result' && currentLocation && (
                <>
                  <CountryFacts countryCode={currentLocation.countryCode} />
                  <PlayerStats stats={stats} />
                </>
              )}
            </motion.div>

            {/* Leaderboard Section */}
            {scores.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <Leaderboard scores={scores} />
              </motion.div>
            )}

            <div className="mt-8 flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const shareText = `Saya baru saja bermain GeoGuesser AI dan mendapatkan skor ${score}! Coba tebak lokasi ini: ${currentLocation.name} 🗺️`;
                  navigator.clipboard.writeText(shareText);
                  alert('Teks berhasil disalin!');
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Bagikan Skor
              </motion.button>
              <Link href="/" className="btn-secondary bg-emerald-100 hover:bg-emerald-200 text-emerald-800">
                Kembali ke Beranda
              </Link>
            </div>

            {/* Add guess animation */}
            {gameState === 'result' && (
              <GuessAnimation
                isCorrect={distance < 100}
                distance={distance}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
} 