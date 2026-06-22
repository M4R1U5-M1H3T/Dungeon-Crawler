'use strict';
const express = require('express');
const challenges = require('../data/challenges');
const { validate } = require('../services/validator');
const router = express.Router();

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function stripAnswer(ch) {
  // Send everything except the answer and altAnswers to the client
  const { answer, altAnswers, ...safe } = ch;
  // Shuffle options so order isn't predictable
  if (safe.options) safe.options = shuffle(safe.options);
  return safe;
}

router.get('/challenges/random', (req, res) => {
  const { topic, maxDiff, type, excludeIds } = req.query;
  const excluded = excludeIds ? excludeIds.split(',').filter(Boolean) : [];

  let pool = challenges;
  if (topic)   pool = pool.filter(c => c.topic === topic);
  if (maxDiff) pool = pool.filter(c => c.difficulty <= parseInt(maxDiff));
  if (type)    pool = pool.filter(c => c.type === type);
  if (!type)   pool = pool.filter(c => c.type !== 'write');

  let available = pool.filter(c => !excluded.includes(c.id));
  if (!available.length) available = pool;
  if (!available.length) available = challenges.filter(c => c.type !== 'write');

  const ch = available[Math.floor(Math.random() * available.length)];
  if (!ch) return res.status(404).json({ error: 'No challenge found' });

  res.json(stripAnswer(ch));
});

router.post('/validate', (req, res) => {
  const { challengeId, answer } = req.body;
  const ch = challenges.find(c => c.id === challengeId);
  if (!ch) return res.status(404).json({ error: 'Challenge not found' });

  const correct = validate(ch, answer);
  const result = {
    correct,
    explanation: ch.explanation,
  };
  if (!correct) {
    result.correctAnswer = ch.answer;
  }
  res.json(result);
});

module.exports = router;
