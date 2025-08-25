const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Use EJS templating engine
app.set('view engine', 'ejs');

// Serve static files from 'public'
app.use(express.static('public'));

// Homepage route - show form with no joke or error at start
app.get('/', (req, res) => {
  res.render('index', { joke: null, error: null });
});

// Handle form submission to get joke
app.post('/joke', async (req, res) => {
  const name = req.body.name || 'Friend'; // get name or default
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
    let joke = response.data.joke || 'No joke found!';
    joke = joke.replace(/Chuck Norris/g, name);
    res.render('index', { joke, error: null });
  } catch (error) {
    res.render('index', { joke: null, error: 'Could not fetch a joke.' });
    console.error(error);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
