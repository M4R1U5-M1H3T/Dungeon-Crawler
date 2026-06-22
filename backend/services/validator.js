'use strict';

function getSimilarity(s1, s2) {
  const len1 = s1.length, len2 = s2.length;
  if (!len1 || !len2) return 0;
  const matrix = Array.from({ length: len1 + 1 }, () => new Array(len2 + 1).fill(0));
  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return 1 - (matrix[len1][len2] / Math.max(len1, len2));
}

function norm(s) {
  return String(s).trim().replace(/\s+/g, '').replace(/['"]/g, '"');
}

function validateWrite(challenge, userAnswer) {
  const userAns = norm(userAnswer);
  if (!userAns) return false;

  const checkMatch = (target) => {
    const t = norm(target);
    if (t === userAns) return true;
    if (getSimilarity(userAns, t) >= 0.80) return true;
    const isSignificantChunk = userAns.length >= Math.max(4, t.length * 0.60);
    if (isSignificantChunk && (t.includes(userAns) || userAns.includes(t))) return true;
    return false;
  };

  if (checkMatch(challenge.answer)) return true;
  if (challenge.altAnswers) {
    for (const alt of challenge.altAnswers) {
      if (checkMatch(alt)) return true;
    }
  }
  return false;
}

function validate(challenge, userAnswer) {
  if (challenge.type === 'write') return validateWrite(challenge, userAnswer);
  return challenge.answer === userAnswer;
}

module.exports = { validate };
