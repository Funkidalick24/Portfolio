const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/data', express.static(path.join(__dirname, 'frontend', 'data')));
app.use('/partials', express.static(path.join(__dirname, 'frontend', 'partials')));

// Routes for all pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'about.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'projects.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'contact.html'));
});

// Handle .html extensions as well
app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'about.html'));
});

app.get('/projects.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'projects.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'contact.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});