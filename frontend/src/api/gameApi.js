const BASE = '/api';

export async function fetchDungeon() {
  const res = await fetch(`${BASE}/dungeon`);
  return res.json();
}

export async function fetchEnemies() {
  const res = await fetch(`${BASE}/enemies`);
  return res.json();
}

export async function fetchChallenge({ topic, maxDiff, type, excludeIds = [] }) {
  const params = new URLSearchParams();
  if (topic) params.set('topic', topic);
  if (maxDiff) params.set('maxDiff', maxDiff);
  if (type) params.set('type', type);
  if (excludeIds.length) params.set('excludeIds', excludeIds.join(','));
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
