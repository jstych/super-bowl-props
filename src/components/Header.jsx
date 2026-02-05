export default function Header({ isLive }) {
  // Official team logos from Wikipedia Commons (SVG for crisp display)
  const seahawksLogo = "https://upload.wikimedia.org/wikipedia/en/8/8e/Seattle_Seahawks_logo.svg";
  const patriotsLogo = "https://upload.wikimedia.org/wikipedia/en/b/b9/New_England_Patriots_logo.svg";

  return (
    <header className="text-center mb-8 pt-4">
      {/* Team logos and matchup */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
        {/* Seahawks */}
        <div className="flex flex-col items-center">
          <img
            src={seahawksLogo}
            alt="Seattle Seahawks"
            className="team-logo"
          />
          <span className="text-xs sm:text-sm font-semibold mt-1 seahawks-accent">
            SEAHAWKS
          </span>
        </div>

        {/* VS / Super Bowl info */}
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold text-white/30">VS</span>
          <div className="text-xs text-slate-500 mt-1">
            {isLive ? (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-red-500 rounded-full live-pulse"></span>
                <span className="text-red-400 font-bold">LIVE</span>
              </span>
            ) : (
              <span>FEB 8, 2026</span>
            )}
          </div>
        </div>

        {/* Patriots */}
        <div className="flex flex-col items-center">
          <img
            src={patriotsLogo}
            alt="New England Patriots"
            className="team-logo"
          />
          <span className="text-xs sm:text-sm font-semibold mt-1 patriots-accent">
            PATRIOTS
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1">
        Super Bowl <span className="text-slate-400">LX</span>
      </h1>

      <h2 className="text-lg sm:text-xl text-slate-400 font-medium">
        Prop Bets Leaderboard
      </h2>
    </header>
  );
}
