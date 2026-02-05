import { questions, categories } from '../data/questions';

export default function PlayerCard({ participant, correctAnswers }) {
  // Group questions by category
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {});

  const getStatusIcon = (status) => {
    if (status === 'correct') return <span className="text-emerald-400">✓</span>;
    if (status === 'incorrect') return <span className="text-red-400">✗</span>;
    return <span className="text-slate-500">○</span>;
  };

  const getStatusBg = (status) => {
    if (status === 'correct') return 'bg-emerald-900/20 border-emerald-700/30';
    if (status === 'incorrect') return 'bg-red-900/20 border-red-700/30';
    return 'bg-slate-800/30 border-slate-700/30';
  };

  return (
    <div className="mt-2 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
      {/* Tiebreaker guess */}
      <div className="mb-4 pb-4 border-b border-slate-700/50">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Total Points Guess (Tiebreaker)</span>
          <span className="text-white font-mono text-lg">{participant.tiebreakerValue}</span>
        </div>
        {correctAnswers.total_points && (
          <div className="text-sm text-slate-500 mt-1">
            Actual: {correctAnswers.total_points} (off by {Math.abs(participant.tiebreakerValue - correctAnswers.total_points)})
          </div>
        )}
      </div>

      {/* Questions by category */}
      {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
        const categoryQuestions = groupedQuestions[categoryKey];
        if (!categoryQuestions) return null;

        return (
          <div key={categoryKey} className="mb-4 last:mb-0">
            <h4 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
              <span>{categoryInfo.emoji}</span>
              <span>{categoryInfo.label}</span>
            </h4>

            <div className="space-y-1">
              {categoryQuestions.map(question => {
                const result = participant.questionResults[question.id];
                if (!result) return null;

                return (
                  <div
                    key={question.id}
                    className={`
                      flex items-start justify-between p-2 rounded border text-sm
                      ${getStatusBg(result.status)}
                    `}
                  >
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <span className="mt-0.5">{getStatusIcon(result.status)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-300 truncate" title={question.text}>
                          {question.shortText}
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5">
                          Picked: <span className="text-slate-200">{result.answer || '—'}</span>
                          {result.status === 'incorrect' && result.correct && (
                            <span className="text-red-400 ml-2">
                              (was: {result.correct})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
