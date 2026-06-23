'use strict';
const express = require('express');
const challenges = require('../data/challenges');
const { validate } = require('../services/validator');
const router = express.Router();

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function stripAnswer(ch) {
  const { answer, altAnswers, ...safe } = ch;
  if (safe.options) safe.options = shuffle(safe.options);
  return safe;
}

router.get('/challenges/random', (req, res) => {
  const { topic, topics, maxDiff, type, excludeIds, grade } = req.query;
  const excluded = excludeIds ? excludeIds.split(',').filter(Boolean) : [];
  const gradeNum = grade ? parseInt(grade) : null;
  const topicList = topics ? topics.split(',').filter(Boolean) : null;

  let pool = challenges;
  if (gradeNum) pool = pool.filter(c => c.grade === gradeNum);
  if (topic)    pool = pool.filter(c => c.topic === topic);
  else if (topicList && topicList.length) pool = pool.filter(c => topicList.includes(c.topic));
  if (maxDiff)  pool = pool.filter(c => c.difficulty <= parseInt(maxDiff));
  if (type)     pool = pool.filter(c => c.type === type);
  if (!type)    pool = pool.filter(c => c.type !== 'write');

  let available = pool.filter(c => !excluded.includes(c.id));
  if (!available.length) available = pool;

  if (!available.length) {
    available = challenges.filter(c => c.type !== 'write');
    if (gradeNum) {
      const gradePool = available.filter(c => c.grade === gradeNum);
      if (gradePool.length) available = gradePool;
    }
  }

  const ch = available[Math.floor(Math.random() * available.length)];
  if (!ch) return res.status(404).json({ error: 'No challenge found' });

  res.json(stripAnswer(ch));
});

router.post('/validate', (req, res) => {
  const { challengeId, answer } = req.body;
  const ch = challenges.find(c => c.id === challengeId);
  if (!ch) return res.status(404).json({ error: 'Challenge not found' });

  const correct = validate(ch, answer);
  const result = { correct, explanation: ch.explanation };
  if (!correct) result.correctAnswer = ch.answer;
  res.json(result);
});

module.exports = router;
