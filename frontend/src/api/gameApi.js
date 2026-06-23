const BASE = '/api';

export async function fetchDungeon(grade = 9) {
  const res = await fetch(`${BASE}/dungeon?grade=${grade}`);
  return res.json();
}

export async function fetchEnemies(grade = 9) {
  const res = await fetch(`${BASE}/enemies?grade=${grade}`);
  return res.json();
}

export async function fetchChallenge({ topic, maxDiff, type, excludeIds = [], grade = 9, selectedTopics = [] }) {
  const params = new URLSearchParams();
  const effectiveTopic = topic || (selectedTopics.length === 1 ? selectedTopics[0] : null);
  if (effectiveTopic) params.set('topic', effectiveTopic);
  else if (selectedTopics.length > 1) params.set('topics', selectedTopics.join(','));
  if (maxDiff) params.set('maxDiff', maxDiff);
  if (type) params.set('type', type);
  if (excludeIds.length) params.set('excludeIds', excludeIds.join(','));
  params.set('grade', grade);
  const res = await fetch(`${BASE}/challenges/random?${params}`);
  return res.json();
}

export async function validateAnswer(challengeId, answer) {
  const res = await fetch(`${BASE}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challengeId, answer }),
  });
  return res.json();
}
