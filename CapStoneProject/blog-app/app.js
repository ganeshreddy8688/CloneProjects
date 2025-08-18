const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let posts = [];

// Home page - list posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Form to create new post
app.get('/posts/new', (req, res) => {
  res.render('new');
});

// Handle creating new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

// Form to edit post
app.get('/posts/:id/edit', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts[id];
  if (!post) return res.status(404).send('Post not found');
  res.render('edit', { id, post });
});

// Handle update post
app.post('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  if (!posts[id]) return res.status(404).send('Post not found');
  posts[id] = { title, content };
  res.redirect('/');
});

// Handle delete post
app.post('/posts/:id/delete', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!posts[id]) return res.status(404).send('Post not found');
  posts.splice(id, 1);
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
