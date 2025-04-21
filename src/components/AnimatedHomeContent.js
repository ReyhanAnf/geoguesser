'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AnimatedHomeContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto"
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
        GeoGuesser AI
      </h1>
      <h2 className="text-2xl sm:text-3xl mb-8">
        Tebak Lokasi Dunia!
      </h2>
      
      <div className="card mb-8">
        <p className="text-lg mb-4">
          Selamat datang di GeoGuesser AI! Tantang dirimu untuk menebak lokasi foto dari seluruh dunia.
        </p>
        <p className="text-lg mb-4">
          Semakin dekat tebakanmu dengan lokasi sebenarnya, semakin tinggi skormu!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/game" className="btn-primary">
          Mulai Permainan
        </Link>
        <Link href="/leaderboard" className="btn-secondary">
          Lihat Peringkat
        </Link>
      </div>
    </motion.div>
  );
} 