'use strict';
const express = require('express');
const dungeonData = require('../data/dungeon');
const router = express.Router();

function getGradeData(gradeParam) {
  const grade = parseInt(gradeParam) || 9;
  return dungeonData[grade] || dungeonData[9];
}

router.get('/dungeon', (req, res) => {
  const { floors } = getGradeData(req.query.grade);
  res.json(floors);
});

router.get('/enemies', (req, res) => {
  const { enemies } = getGradeData(req.query.grade);
  res.json(enemies);
});

router.get('/enemies/:id', (req, res) => {
  
  for (const data of Object.values(dungeonData)) {
    const enemy = data.enemies.find(e => e.id === req.params.id);
    if (enemy) return res.json(enemy);
  }
  res.status(404).json({ error: 'Enemy not found' });
});

module.exports = router;
