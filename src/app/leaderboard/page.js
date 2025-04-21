'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Load scores from localStorage
    const savedScores = JSON.parse(localStorage.getItem('geoguesser_scores') || '[]');
    setScores(savedScores.sort((a, b) => b.score - a.score).slice(0, 10));
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Peringkat Tertinggi</h1>
          
          <div className="card">
            {scores.length === 0 ? (
              <p className="text-center text-lg">Belum ada skor yang tersimpan.</p>
            ) : (
              <div className="space-y-4">
                {scores.map((score, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-primary">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-semibold">Skor: {score.score}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(score.date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm">
                      {Math.round(score.distance / 1000)} km
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="btn-primary">
              Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 