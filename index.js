// index.js

const express = require('express');
const app = express();
const port = 3000; 

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Routes
const gameRoutes = require('./routes/games');
app.use('/api/games', gameRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
