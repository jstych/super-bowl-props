import { useParams, Link, Navigate } from 'react-router-dom';
import Header from './Header';
import hallOfFame from '../data/hallOfFame.js';

export default function HallOfFame() {
  const { group } = useParams();

  // Only friends-family is supported
  if (group && group !== 'friends-family') {
    return <Navigate to="/friends-family" replace />;
  }

  const winners = hallOfFame['friends-family'];

  if (!winners || winners.length === 0) {
    return <Navigate to="/friends-family" replace />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Back link */}
        <div className="flex justify-center mb-6">
          <Link
            to="/friends-family"
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
          <p className="text-slate-400 mt-2">Friends & Family — Previous Champions</p>
        </div>

        {/* Winners List */}
        <div className="w-full max-w-2xl mx-auto space-y-3">
          {winners.map((winner, index) => (
            <div
              key={winner.year}
              className={`
                rounded-lg overflow-hidden
                ${index === 0
                  ? 'bg-gradient-to-r from-amber-900/40 to-amber-800/30 border border-amber-600/30'
                  : 'bg-slate-800/50 border border-transparent'
                }
              `}
            >
              {/* Winner row */}
              <div className="flex items-center justify-between p-4 sm:p-5">
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

              {/* Game matchup row */}
              {winner.teams && (
                <div className="px-4 sm:px-5 pb-4 pt-0">
                  <div className="flex items-center justify-center gap-3 py-2 px-3 rounded bg-slate-900/40">
                    {/* Team 1 */}
                    <div className="flex items-center gap-2">
                      <img
                        src={winner.teams[0].logo}
                        alt={`${winner.teams[0].city} ${winner.teams[0].name}`}
                        title={`${winner.teams[0].city} ${winner.teams[0].name}`}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      />
                      <span className="text-white font-bold text-sm sm:text-base tabular-nums">
                        {winner.teams[0].score}
                      </span>
                    </div>

                    <span className="text-slate-500 text-xs font-medium">—</span>

                    {/* Team 2 */}
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm sm:text-base tabular-nums">
                        {winner.teams[1].score}
                      </span>
                      <img
                        src={winner.teams[1].logo}
                        alt={`${winner.teams[1].city} ${winner.teams[1].name}`}
                        title={`${winner.teams[1].city} ${winner.teams[1].name}`}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
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
