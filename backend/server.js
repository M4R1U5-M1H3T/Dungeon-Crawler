'use strict';
const express = require('express');
const cors = require('cors');
const dungeonRoutes = require('./routes/dungeon');
const challengeRoutes = require('./routes/challenges');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', dungeonRoutes);
app.use('/api', challengeRoutes);

app.listen(PORT, () => {
  console.log(`Syntax Sorcerer backend running on http://localhost:${PORT}`);
});
