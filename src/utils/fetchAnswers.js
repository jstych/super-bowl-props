import Papa from 'papaparse';

// Your Google Sheet for correct answers (separate sheet/tab)
// Create a sheet with two columns: "question_id" and "answer"
// Publish it as CSV and paste the URL here
// Leave as null to use the local correctAnswers.json file instead
const ANSWERS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAZbR2vzjLYa6advTgRuaSj7C3tcP6DdBzrkt4HBk6eWDyzsvEfa3x-LqRR2887TKPClITeNCPy67e/pub?gid=0&single=true&output=csv';

/**
 * Fetches correct answers from Google Sheets
 * Falls back to local JSON if no sheet URL configured
 * @returns {Promise<Object>} Object with question IDs as keys and answers as values
 */
export async function fetchAnswers() {
  // If no sheet URL configured, return null to use local JSON
  if (!ANSWERS_SHEET_URL) {
    return null;
  }

  try {
    // Add cache-busting param to prevent stale data
    const cacheBuster = `_cb=${Date.now()}`;
    const urlWithCacheBuster = ANSWERS_SHEET_URL.includes('?')
      ? `${ANSWERS_SHEET_URL}&${cacheBuster}`
      : `${ANSWERS_SHEET_URL}?${cacheBuster}`;

    const response = await fetch(urlWithCacheBuster, {
      cache: 'no-store'
    });

    if (!response.ok) {
      console.warn('Failed to fetch answers sheet, using local JSON');
      return null;
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const answers = {};

          results.data.forEach(row => {
            // Expected columns: "question_id" and "answer"
            const questionId = row['question_id'] || row['id'] || row['Question ID'];
            const answer = row['answer'] || row['Answer'] || row['correct_answer'];

            if (questionId) {
              // Empty string or whitespace-only = null (unanswered)
              answers[questionId] = answer && answer.trim() ? answer.trim() : null;
            }
          });

          resolve(answers);
        },
        error: (error) => {
          console.warn('CSV parse error, using local JSON:', error.message);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.warn('Error fetching answers:', error);
    return null;
  }
}

/**
 * Template for your answers sheet
 * Copy this to a new Google Sheet tab
 */
export const answersTemplate = `
question_id,answer
coin_toss,
anthem_length,
two_point_conversion,
first_five_minutes,
last_five_minutes,
first_to_score,
maye_rushing_td,
first_catch,
qb_catch_pass,
qb_interception,
longest_fg,
kneel_down,
score_tied,
largest_lead,
bad_bunny_songs,
cardi_b_halftime,
first_guest,
first_snack,
first_beer,
bear_basketball,
kelce_manning,
mvp_position,
gatorade_color,
total_points,
`.trim();
