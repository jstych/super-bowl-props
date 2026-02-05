import Papa from 'papaparse';

// Google Sheet URLs for each group
export const SHEET_URLS = {
  'friends-family': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTI03o7UvWy2x7Mg55mjOO9Gsn3MiQRoh5ARc28xdIfDkxGvFy57PfweWp1fg085OaFigO9Yz8ykyyc/pub?output=csv',
  'zapier': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQaNrPg4HDgXF5nO7ud-ZXW79CnpZRTbnQeF_KZwprikbYUu08X4cgus-9Lnhp9_W4zySj-UOuWAu9W/pub?output=csv'
};

// Group display names
export const GROUP_NAMES = {
  'friends-family': 'Friends & Family',
  'zapier': 'Zapier'
};

/**
 * Fetches participant picks from a Google Sheet CSV
 * @param {string} group - The group to fetch ('friends-family' or 'zapier')
 * @returns {Promise<Array>} Array of participant objects with their picks
 */
export async function fetchPicks(group = 'friends-family') {
  const sheetUrl = SHEET_URLS[group];

  if (!sheetUrl) {
    throw new Error(`Unknown group: ${group}`);
  }

  try {
    // Add cache-busting param to prevent stale data
    const cacheBuster = `_cb=${Date.now()}`;
    const urlWithCacheBuster = sheetUrl.includes('?')
      ? `${sheetUrl}&${cacheBuster}`
      : `${sheetUrl}?${cacheBuster}`;

    const response = await fetch(urlWithCacheBuster, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Clean up the data
          const picks = results.data.map((row, index) => {
            // Find the name column (might be "Name" or similar)
            const nameKey = Object.keys(row).find(key =>
              key.toLowerCase().includes('name') && !key.toLowerCase().includes('what')
            ) || Object.keys(row)[1]; // Fallback to second column (first is usually timestamp)

            return {
              id: `${group}-${index}`,
              name: row[nameKey] || `Player ${index + 1}`,
              timestamp: row['Timestamp'] || row[Object.keys(row)[0]],
              picks: row // All columns including picks
            };
          });

          resolve(picks);
        },
        error: (error) => {
          reject(new Error(`CSV parse error: ${error.message}`));
        }
      });
    });
  } catch (error) {
    console.error(`Error fetching picks for ${group}:`, error);
    throw error;
  }
}

/**
 * For testing: returns mock data when sheet isn't accessible
 */
export function getMockPicks(group = 'friends-family') {
  const mockData = {
    'friends-family': [
      {
        id: 'ff-0',
        name: "Joey",
        timestamp: "2026-02-01 10:00:00",
        picks: {
          "What will be the result of the coin toss?": "Heads",
          "Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?": "Shorter",
          "Will there be a successful two-point conversion?": "Yes",
          "Which team will score first?": "Seahawks",
          "What color will the Gatorade be that's poured on the winning coach?": "Blue",
          "What will the total number of points be, for both teams, at the end of the game? (Tiebreaker)": "48"
        }
      },
      {
        id: 'ff-1',
        name: "MJ",
        timestamp: "2026-02-01 11:00:00",
        picks: {
          "What will be the result of the coin toss?": "Tails",
          "Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?": "Longer",
          "Will there be a successful two-point conversion?": "No",
          "Which team will score first?": "Patriots",
          "What color will the Gatorade be that's poured on the winning coach?": "Orange",
          "What will the total number of points be, for both teams, at the end of the game? (Tiebreaker)": "52"
        }
      },
      {
        id: 'ff-2',
        name: "Ed Stych",
        timestamp: "2026-02-01 12:00:00",
        picks: {
          "What will be the result of the coin toss?": "Heads",
          "Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?": "Shorter",
          "Will there be a successful two-point conversion?": "No",
          "Which team will score first?": "Seahawks",
          "What color will the Gatorade be that's poured on the winning coach?": "Yellow/Green/Lime",
          "What will the total number of points be, for both teams, at the end of the game? (Tiebreaker)": "45"
        }
      }
    ],
    'zapier': [
      {
        id: 'z-0',
        name: "Wade Foster",
        timestamp: "2026-02-01 09:00:00",
        picks: {
          "What will be the result of the coin toss?": "Tails",
          "Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?": "Shorter",
          "Will there be a successful two-point conversion?": "Yes",
          "Which team will score first?": "Patriots",
          "What color will the Gatorade be that's poured on the winning coach?": "Orange",
          "What will the total number of points be, for both teams, at the end of the game? (Tiebreaker)": "51"
        }
      },
      {
        id: 'z-1',
        name: "Mike Knoop",
        timestamp: "2026-02-01 09:30:00",
        picks: {
          "What will be the result of the coin toss?": "Heads",
          "Will Charlie Puth's national anthem be longer or shorter than 119.5 seconds?": "Longer",
          "Will there be a successful two-point conversion?": "No",
          "Which team will score first?": "Seahawks",
          "What color will the Gatorade be that's poured on the winning coach?": "Blue",
          "What will the total number of points be, for both teams, at the end of the game? (Tiebreaker)": "44"
        }
      }
    ]
  };

  return mockData[group] || mockData['friends-family'];
}
