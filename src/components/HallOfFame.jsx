import { useParams, Link, Navigate } from 'react-router-dom';
import Header from './Header';
import hallOfFame from '../data/hallOfFame.js';
import { GROUP_NAMES } from '../utils/fetchPicks';

export default function HallOfFame() {
  const { group } = useParams();

  // Validate group
  if (!GROUP_NAMES[group]) {
    return <Navigate to="/friends-family" replace />;
  }

  const winners = hallOfFame[group];

  // If no hall of fame data for this group, redirect back
  if (!winners || winners.length === 0) {
    return <Navigate to={`/${group}`} replace />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Header isLive={false} />

        {/* Back link */}
        <div className="flex justify-center mb-6">
          <Link
            to={`/${group}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Leaderboard
          </Link>
        </div>

        {/* Hall of Fame Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="mr-2">🏆</span>
            Hall of Fame
          </h2>
          <p className="text-slate-400 mt-2">{GROUP_NAMES[group]} — Previous Champions</p>
        </div>

        {/* Winners List */}
        <div className="w-full max-w-2xl mx-auto space-y-3">
          {winners.map((winner, index) => (
            <div
              key={winner.year}
              className={`
                flex items-center justify-between p-4 sm:p-5 rounded-lg
                ${index === 0
                  ? 'bg-gradient-to-r from-amber-900/40 to-amber-800/30 border border-amber-600/30'
                  : 'bg-slate-800/50 border border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-4">
                {/* Trophy / rank indicator */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg
                  ${index === 0 ? 'bg-amber-500 text-amber-950' : 'bg-slate-700 text-slate-300'}
                `}>
                  {index === 0 ? '🏆' : '🏈'}
                </div>

                {/* Winner name */}
                <div>
                  <span className={`
                    font-semibold text-lg
                    ${index === 0 ? 'leader-shimmer' : 'text-white'}
                  `}>
                    {winner.name}
                  </span>
                  <p className="text-sm text-slate-500 sm:hidden">
                    Super Bowl {winner.superbowl}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Super Bowl number (desktop) */}
                <span className="hidden sm:inline text-sm text-slate-400">
                  Super Bowl {winner.superbowl}
                </span>

                {/* Year */}
                <span className={`
                  text-xl font-bold tabular-nums
                  ${index === 0 ? 'text-amber-400' : 'text-slate-300'}
                `}>
                  {winner.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>{winners.length} year{winners.length !== 1 ? 's' : ''} of champions</p>
        </footer>
      </div>
    </div>
  );
}
