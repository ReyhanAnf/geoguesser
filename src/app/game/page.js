import dynamic from 'next/dynamic';

const GameClient = dynamic(() => import('@/components/GameClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-matcha-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <p className="text-emerald-600">Memuat permainan...</p>
      </div>
    </div>
  ),
});

export default function GamePage() {
  return <GameClient />;
} 