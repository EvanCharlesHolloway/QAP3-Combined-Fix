const express = require('express');
const path = require('path');  // Add this line to import the 'path' module
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Set the views directory

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Serve static files from the "QAP3 Combined/public" directory
app.use(express.static('QAP3 Combined/public'));

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
