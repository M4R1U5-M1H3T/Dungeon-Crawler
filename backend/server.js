'use strict';
const express = require('express');
const cors = require('cors');
const dungeonRoutes = require('./routes/dungeon');
const challengeRoutes = require('./routes/challenges');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error('CORS: origin not allowed'));
  },
}));

app.use(express.json());
app.use('/api', dungeonRoutes);
app.use('/api', challengeRoutes);

app.listen(PORT, () => {
  console.log(`Syntax Sorcerer backend running on port ${PORT}`);
});
