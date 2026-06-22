'use strict';
const express = require('express');
const { enemies, floors } = require('../data/dungeon');
const router = express.Router();

router.get('/dungeon', (req, res) => {
  res.json(floors);
});

router.get('/enemies', (req, res) => {
  res.json(enemies);
});

router.get('/enemies/:id', (req, res) => {
  const enemy = enemies.find(e => e.id === req.params.id);
  if (!enemy) return res.status(404).json({ error: 'Enemy not found' });
  res.json(enemy);
});

module.exports = router;
