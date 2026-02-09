import correctAnswersData from '../data/correctAnswers.json';

/**
 * Returns correct answers from the local JSON file.
 * After running freeze-data.mjs, this file contains the final answers.
 */
export async function fetchAnswers() {
  return correctAnswersData;
}
