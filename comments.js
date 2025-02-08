// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Read comments from file
const readComments = () => {
  const data = fs.readFileSync('./comments.json');
  return JSON.parse(data);
}

// Write comments to file
const writeComments = (comments) => {
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
}

// Parse request body
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.send(readComments());
});

// Add a comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const newComment = req.body;
  comments.push(newComment);
  writeComments(comments);
  res.send(newComment);
});

// Start web server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});