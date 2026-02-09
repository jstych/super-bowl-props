import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import { fetchPicks } from './utils/fetchPicks';
import hallOfFame from './data/hallOfFame.js';
import { fetchAnswers } from './utils/fetchAnswers';
import { calculateScores, getProgress } from './utils/calculateScores';

function App() {
  const { group } = useParams();

  // Only friends-family is supported now
  if (group && group !== 'friends-family') {
    return <Navigate to="/friends-family" replace />;
  }

  const [participants, setParticipants] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [progress, setProgress] = useState({ answered: 0, total: 24, percentage: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [picks, answers] = await Promise.all([
          fetchPicks(),
          fetchAnswers(),
        ]);

        if (!picks || picks.length === 0) {
          throw new Error('No picks data found');
        }

        setCorrectAnswers(answers);
        const scored = calculateScores(picks, answers);
        setParticipants(scored);
        setProgress(getProgress(answers));
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Hall of Fame button */}
        {hallOfFame['friends-family']?.length > 0 && (
          <div className="flex justify-center mb-6">
            <Link
              to="/friends-family/hall-of-fame"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800/60 border border-amber-600/20 text-amber-400 hover:bg-amber-900/30 hover:border-amber-500/40 transition-all text-sm font-medium"
            >
              <span>🏆</span>
              Hall of Fame
            </Link>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-slate-600 border-t-emerald-400 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Loading picks...</p>
          </div>
        ) : error ? (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300 text-center">
            <p className="font-medium">Couldn't load data</p>
            <p className="text-sm text-red-400 mt-1">{error}</p>
          </div>
        ) : (
          <>
            <Leaderboard
              participants={participants}
              correctAnswers={correctAnswers}
              progress={progress}
            />

            {/* Footer */}
            <footer className="mt-8 text-center text-slate-500 text-sm">
              <p>Super Bowl LX &bull; February 8, 2026</p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
