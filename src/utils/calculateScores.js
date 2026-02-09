import { questions, tiebreaker } from '../data/questions';

/**
 * Calculates scores for all participants based on correct answers
 * @param {Array} picks - Array of participant objects from fetchPicks
 * @param {Object} correctAnswers - Object with question IDs as keys and correct answers as values
 * @returns {Array} Participants with scores added, sorted by score (highest first)
 */
export function calculateScores(picks, correctAnswers) {
  const scoredPicks = picks.map(participant => {
    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let pending = 0;
    const questionResults = {};

    questions.forEach(question => {
      const participantAnswer = participant.picks[question.column];
      const correctAnswer = correctAnswers[question.id];

      if (correctAnswer === null || correctAnswer === undefined) {
        // Question not yet answered
        questionResults[question.id] = {
          answer: participantAnswer,
          correct: null,
          status: 'pending'
        };
        pending++;
      } else if (normalizeAnswer(participantAnswer) === normalizeAnswer(correctAnswer)) {
        // Correct answer
        score += question.points;
        correct++;
        questionResults[question.id] = {
          answer: participantAnswer,
          correct: correctAnswer,
          status: 'correct'
        };
      } else {
        // Incorrect answer
        incorrect++;
        questionResults[question.id] = {
          answer: participantAnswer,
          correct: correctAnswer,
          status: 'incorrect'
        };
      }
    });

    // Get tiebreaker value
    const tiebreakerValue = parseInt(participant.picks[tiebreaker.column], 10) || 0;

    return {
      ...participant,
      score,
      correct,
      incorrect,
      pending,
      questionResults,
      tiebreakerValue
    };
  });

  // Sort by score (descending), then by tiebreaker proximity to actual total
  return sortByScoreAndTiebreaker(scoredPicks, correctAnswers.total_points);
}

/**
 * Normalizes answers for comparison (trims whitespace, lowercase, handles variations)
 */
function normalizeAnswer(answer) {
  if (answer === null || answer === undefined) return '';

  return String(answer)
    .trim()
    .toLowerCase()
    // Handle common variations
    .replace(/^(over|under)\s*\(.*\)$/i, '$1') // "Over (12+)" -> "over"
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Sorts participants by score, using tiebreaker for equal scores
 */
function sortByScoreAndTiebreaker(participants, actualTotal) {
  return participants.sort((a, b) => {
    // Primary sort: score (descending)
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // Tiebreaker: closest to actual total (if known)
    if (actualTotal !== null && actualTotal !== undefined) {
      const aDiff = Math.abs(a.tiebreakerValue - actualTotal);
      const bDiff = Math.abs(b.tiebreakerValue - actualTotal);
      return aDiff - bDiff;
    }

    // If no tiebreaker yet, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get progress stats (how many questions answered)
 */
export function getProgress(correctAnswers) {
  const total = questions.length + 1;
  const answered = Object.values(correctAnswers).filter(v => v !== null).length;
  return {
    answered,
    total,
    percentage: Math.round((answered / total) * 100)
  };
}

/**
 * Get category-wise breakdown of correct answers
 */
export function getCategoryProgress(correctAnswers) {
  const categoryStats = {};

  questions.forEach(question => {
    if (!categoryStats[question.category]) {
      categoryStats[question.category] = { answered: 0, total: 0 };
    }
    categoryStats[question.category].total++;
    if (correctAnswers[question.id] !== null) {
      categoryStats[question.category].answered++;
    }
  });

  return categoryStats;
}
