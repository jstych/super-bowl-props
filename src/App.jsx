import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import { fetchPicks, getMockPicks, GROUP_NAMES, SHEET_URLS } from './utils/fetchPicks';
import { fetchAnswers } from './utils/fetchAnswers';
import { calculateScores, getProgress } from './utils/calculateScores';
import correctAnswersData from './data/correctAnswers.json';

function App() {
  const { group } = useParams();

  // Validate group - redirect if invalid
  if (!GROUP_NAMES[group]) {
    return <Navigate to="/friends-family" replace />;
  }

  const [participants, setParticipants] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(correctAnswersData);
  const [progress, setProgress] = useState({ answered: 0, total: 23, percentage: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [answersSource, setAnswersSource] = useState('local');
  const [fetchAttempt, setFetchAttempt] = useState(0);

  // Load data function with cache-busting
  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);

    try {
      // Fetch picks for the current group
      let picks;
      if (useMockData) {
        picks = getMockPicks(group);
      } else {
        picks = await fetchPicks(group);
      }

      // Verify we got data
      if (!picks || picks.length === 0) {
        throw new Error('No picks data returned');
      }

      // Fetch answers from Google Sheet (shared between both groups)
      const sheetAnswers = await fetchAnswers();
      if (sheetAnswers) {
        setCorrectAnswers(sheetAnswers);
        setAnswersSource('sheet');
      } else {
        setAnswersSource('local');
      }

      const answersToUse = sheetAnswers || correctAnswers;
      const scored = calculateScores(picks, answersToUse);
      setParticipants(scored);
      setProgress(getProgress(answersToUse));
      setLastUpdated(new Date());
      setFetchAttempt(0); // Reset retry counter on success
    } catch (err) {
      console.error('Failed to load data:', err);

      // Retry up to 2 times with exponential backoff
      if (fetchAttempt < 2 && !useMockData) {
        setTimeout(() => {
          setFetchAttempt(prev => prev + 1);
        }, 1000 * Math.pow(2, fetchAttempt));
        return;
      }

      if (!silent) {
        setError(err.message);
        // Fall back to mock data
        const mockPicks = getMockPicks(group);
        const scored = calculateScores(mockPicks, correctAnswers);
        setParticipants(scored);
        setProgress(getProgress(correctAnswers));
        setUseMockData(true);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [group, useMockData, correctAnswers, fetchAttempt]);

  // Fetch on load and when group/retry changes
  useEffect(() => {
    loadData();
  }, [group, fetchAttempt]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [loadData]);

  // Recalculate scores when correctAnswers changes
  useEffect(() => {
    if (participants.length > 0) {
      const rawPicks = participants.map(p => ({
        id: p.id,
        name: p.name,
        timestamp: p.timestamp,
        picks: p.picks
      }));
      const scored = calculateScores(rawPicks, correctAnswers);
      setParticipants(scored);
      setProgress(getProgress(correctAnswers));
    }
  }, [correctAnswers]);

  // Check if game is "live"
  const isLive = progress.answered > 0 && progress.answered < progress.total;

  // Get other group for the nav link
  const otherGroup = group === 'friends-family' ? 'zapier' : 'friends-family';

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Header isLive={isLive} />

        {/* Page Navigation */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-slate-800/50 rounded-lg p-1">
            {Object.entries(GROUP_NAMES).map(([groupId, groupName]) => (
              <Link
                key={groupId}
                to={`/${groupId}`}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${group === groupId
                    ? groupId === 'zapier'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-slate-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }
                `}
              >
                {groupId === 'zapier' && <span className="mr-1">⚡</span>}
                {groupId === 'friends-family' && <span className="mr-1">👨‍👩‍👧‍👦</span>}
                {groupName}
              </Link>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-slate-600 border-t-emerald-400 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Loading {GROUP_NAMES[group]} picks...</p>
            {fetchAttempt > 0 && (
              <p className="text-slate-500 text-sm mt-2">Retrying... (attempt {fetchAttempt + 1})</p>
            )}
          </div>
        ) : (
          <>
            {error && !useMockData && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300">
                <p className="font-medium">Couldn't load picks from Google Sheets</p>
                <p className="text-sm text-red-400 mt-1">{error}</p>
                <button
                  onClick={() => setUseMockData(true)}
                  className="mt-2 text-sm text-red-200 underline hover:no-underline"
                >
                  Use demo data instead
                </button>
              </div>
            )}

            {useMockData && (
              <div className="mb-6 p-3 bg-amber-900/30 border border-amber-700/50 rounded-lg text-amber-300 text-sm text-center">
                📋 Using demo data — <button
                  onClick={() => {
                    setUseMockData(false);
                    setFetchAttempt(0);
                    loadData();
                  }}
                  className="underline hover:no-underline"
                >try loading real data</button>
              </div>
            )}

            <Leaderboard
              participants={participants}
              correctAnswers={correctAnswers}
              progress={progress}
            />

            {/* Footer */}
            <footer className="mt-8 text-center text-slate-500 text-sm">
              {lastUpdated && (
                <p>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                  {' '}&bull;{' '}
                  <button
                    onClick={() => loadData()}
                    className="text-slate-400 hover:text-white underline"
                  >
                    Refresh now
                  </button>
                </p>
              )}
              <p className="mt-2">
                Auto-refreshes every 30 seconds
                {answersSource === 'sheet' && (
                  <span className="text-emerald-500 ml-2">• Answers from Google Sheet</span>
                )}
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
