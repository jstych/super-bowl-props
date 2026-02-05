import { useState } from 'react';
import PlayerCard from './PlayerCard';

export default function Leaderboard({ participants, correctAnswers, progress }) {
  const [expandedPlayer, setExpandedPlayer] = useState(null);

  const togglePlayer = (playerId) => {
    setExpandedPlayer(expandedPlayer === playerId ? null : playerId);
  };

  const getRankDisplay = (index, participant, participants) => {
    // Handle ties - same rank for same score
    if (index === 0) return 1;

    const prevParticipant = participants[index - 1];
    if (participant.score === prevParticipant.score) {
      // Find the first person with this score
      let rank = index;
      while (rank > 0 && participants[rank - 1].score === participant.score) {
        rank--;
      }
      return rank + 1;
    }
    return index + 1;
  };

  const getRankEmoji = (rank) => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6 bg-slate-800/50 rounded-lg p-4">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Questions Answered</span>
          <span>{progress.answered} / {progress.total}</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        {progress.answered === 0 && (
          <p className="text-sm text-slate-500 mt-2 text-center">
            Waiting for the game to start...
          </p>
        )}
      </div>

      {/* Leaderboard list */}
      <div className="space-y-2">
        {participants.map((participant, index) => {
          const rank = getRankDisplay(index, participant, participants);
          const rankEmoji = getRankEmoji(rank);
          const isLeader = rank === 1 && progress.answered > 0;
          const isExpanded = expandedPlayer === participant.id;

          return (
            <div key={participant.id} className="score-update">
              {/* Main row */}
              <button
                onClick={() => togglePlayer(participant.id)}
                className={`
                  w-full flex items-center justify-between p-4 rounded-lg
                  transition-all duration-200
                  ${isLeader
                    ? 'bg-gradient-to-r from-amber-900/40 to-amber-800/30 border border-amber-600/30'
                    : 'bg-slate-800/50 hover:bg-slate-800/70 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${isLeader ? 'bg-amber-500 text-amber-950' : 'bg-slate-700 text-slate-300'}
                  `}>
                    {rankEmoji || rank}
                  </div>

                  {/* Name */}
                  <span className={`
                    font-medium text-lg
                    ${isLeader ? 'leader-shimmer' : 'text-white'}
                  `}>
                    {participant.name}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Score breakdown */}
                  <div className="hidden sm:flex items-center gap-2 text-sm">
                    <span className="text-emerald-400">{participant.correct}✓</span>
                    <span className="text-red-400">{participant.incorrect}✗</span>
                    <span className="text-slate-500">{participant.pending}?</span>
                  </div>

                  {/* Total score */}
                  <div className={`
                    text-2xl font-bold tabular-nums
                    ${isLeader ? 'text-amber-400' : 'text-white'}
                  `}>
                    {participant.score}
                  </div>

                  {/* Expand indicator */}
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <PlayerCard
                  participant={participant}
                  correctAnswers={correctAnswers}
                />
              )}
            </div>
          );
        })}
      </div>

      {participants.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-xl mb-2">No picks loaded yet</p>
          <p className="text-sm">Make sure your Google Sheet is published to the web</p>
        </div>
      )}
    </div>
  );
}
