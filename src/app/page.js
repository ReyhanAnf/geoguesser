'use client';

import Link from 'next/link';
import AnimatedHomeContent from '@/components/AnimatedHomeContent';

// Daftar lokasi untuk showcase
const showcaseLocations = [
  {
    name: 'Monumen Nasional',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg',
    description: 'Monumen setinggi 132 meter yang menjadi simbol kemerdekaan Indonesia'
  },
  {
    name: 'Menara Eiffel',
    country: 'Prancis',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
    description: 'Menara besi setinggi 324 meter yang menjadi ikon kota Paris'
  },
  {
    name: 'Tembok Besar China',
    country: 'China',
    image: 'https://images.pexels.com/photos/161401/famous-landmark-china-great-wall-of-china-161401.jpeg',
    description: 'Struktur pertahanan terpanjang di dunia yang dibangun selama ribuan tahun'
  },
  {
    name: 'Taj Mahal',
    country: 'India',
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
    description: 'Mausoleum marmer putih yang dibangun sebagai simbol cinta'
  },
  {
    name: 'Patung Liberty',
    country: 'Amerika Serikat',
    image: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg',
    description: 'Patung yang menjadi simbol kebebasan dan demokrasi di New York'
  },
  {
    name: 'Colosseum',
    country: 'Italia',
    image: 'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg',
    description: 'Arena gladiator kuno yang menjadi simbol kekaisaran Romawi'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-matcha-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50" />
          <img
            src="https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            GeoGuesser AI
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Tebak Lokasi Dunia!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/game"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Mulai Bermain
            </Link>
            <Link
              href="/leaderboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Lihat Peringkat
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 text-center mb-12">
            Fitur Menarik
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Lokasi dari Seluruh Dunia</h3>
              <p className="text-emerald-700">Tebak landmark terkenal dari berbagai negara dan benua</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Sistem Skor</h3>
              <p className="text-emerald-700">Dapatkan skor berdasarkan ketepatan tebakan lokasi Anda</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Papan Peringkat</h3>
              <p className="text-emerald-700">Bandingkan skor Anda dengan pemain lain</p>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="py-16 px-4 bg-emerald-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 text-center mb-12">
            Jelajahi Dunia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseLocations.map((location, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">{location.name}</h3>
                  <p className="text-emerald-700 mb-2">{location.country}</p>
                  <p className="text-emerald-600">{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8">
            Tentang GeoGuesser AI
          </h2>
          <p className="text-lg text-emerald-700 mb-8 max-w-3xl mx-auto">
            GeoGuesser AI adalah permainan tebak lokasi yang dikembangkan dengan bantuan Cursor AI. 
            Game ini dirancang untuk menguji pengetahuan geografis Anda sambil menjelajahi keindahan dunia.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/game"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Mulai Bermain Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">Dikembangkan dengan ❤️ menggunakan Cursor AI</p>
          <p className="text-sm text-emerald-200">
            © {new Date().getFullYear()} GeoGuesser AI. Semua gambar digunakan di bawah lisensi Creative Commons.
          </p>
        </div>
      </footer>
    </main>
  );
}
