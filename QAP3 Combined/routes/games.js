// routes/games.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'QAP 3 Main',
    password: 'Keyin2021',
    port: 5432,
});

// GET all games
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM games');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a specific game by ID
router.get('/:id', async (req, res) => {
  const gameId = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM games WHERE id = $1', [gameId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a new game
router.post('/', async (req, res) => {
  const newGame = req.body;
  try {
    const result = await pool.query('INSERT INTO games (title) VALUES ($1) RETURNING *', [newGame.title]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT (update) a game by ID
router.put('/:id', async (req, res) => {
  const gameId = parseInt(req.params.id);
  const updatedGame = req.body;
  try {
    const result = await pool.query('UPDATE games SET title = $1 WHERE id = $2 RETURNING *', [
      updatedGame.title,
      gameId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PATCH (partially update) a game by ID
router.patch('/:id', async (req, res) => {
  const gameId = parseInt(req.params.id);
  const partialUpdate = req.body;
  try {
    const result = await pool.query('UPDATE games SET title = $1 WHERE id = $2 RETURNING *', [
      partialUpdate.title,
      gameId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a game by ID
router.delete('/:id', async (req, res) => {
  const gameId = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM games WHERE id = $1 RETURNING *', [gameId]);
    if (result.rows.length > 0) {
      res.json({ message: 'Game deleted', deletedGame: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
