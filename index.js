// index.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Routes
const gameRoutes = require('./QAP3 Combined/routes/games');
app.use('/api/games', gameRoutes);

// Define a route for the root path ("/")
app.get('/', (req, res) => {
  res.send('Welcome to HollowGames! Explore our collection of exciting games.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
