#!/usr/bin/env node

/**
 * Freeze Google Sheets data into local JSON files.
 * Run this once to hardcode all picks and answers so the
 * Google Sheets don't need to stay published.
 *
 * Usage: node scripts/freeze-data.mjs
 */

import Papa from 'papaparse';
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SHEETS = {
  picks: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTI03o7UvWy2x7Mg55mjOO9Gsn3MiQRoh5ARc28xdIfDkxGvFy57PfweWp1fg085OaFigO9Yz8ykyyc/pub?output=csv',
  answers: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAZbR2vzjLYa6advTgRuaSj7C3tcP6DdBzrkt4HBk6eWDyzsvEfa3x-LqRR2887TKPClITeNCPy67e/pub?gid=0&single=true&output=csv',
};

async function fetchCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

function parseCSV(csvText) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
}

async function main() {
  console.log('Fetching picks from Google Sheets...');
  const picksCSV = await fetchCSV(SHEETS.picks);
  const picksRows = await parseCSV(picksCSV);

  // Transform picks into the format the app expects
  const picks = picksRows.map((row, index) => {
    const nameKey = Object.keys(row).find(
      (key) => key.toLowerCase().includes('name') && !key.toLowerCase().includes('what')
    ) || Object.keys(row)[1];

    return {
      id: `ff-${index}`,
      name: row[nameKey] || `Player ${index + 1}`,
      timestamp: row['Timestamp'] || row[Object.keys(row)[0]],
      picks: row,
    };
  });

  const picksPath = join(__dirname, '..', 'src', 'data', 'picks.json');
  writeFileSync(picksPath, JSON.stringify(picks, null, 2));
  console.log(`Wrote ${picks.length} participants to ${picksPath}`);

  console.log('Fetching answers from Google Sheets...');
  const answersCSV = await fetchCSV(SHEETS.answers);
  const answersRows = await parseCSV(answersCSV);

  const answers = {};
  answersRows.forEach((row) => {
    const questionId = row['question_id'] || row['id'] || row['Question ID'];
    const answer = row['answer'] || row['Answer'] || row['correct_answer'];
    if (questionId) {
      answers[questionId] = answer && answer.trim() ? answer.trim() : null;
    }
  });

  const answersPath = join(__dirname, '..', 'src', 'data', 'correctAnswers.json');
  writeFileSync(answersPath, JSON.stringify(answers, null, 2));
  console.log(`Wrote answers to ${answersPath}`);

  console.log('\nDone! You can now unpublish the Google Sheets.');
  console.log('The app will use the local JSON files instead.');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
