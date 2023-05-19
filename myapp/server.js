const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

mysql.createConnection({
  host : 'localhost',
  user : 'phpmyadmin',
  password : 'Pass@123',
  database : 'blog_db'
});

db.connect((error) => {
  if(error) {
    throw error
  }

  console.log('Something went wrong with connection')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test purpose that server is working...
app.get('/', (req, res) => {
  res.send('Hello ')
});

//List all the Posts.
app.get('/api/posts', (req, res) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (error, results) => {
    if(error) {
      throw error
    }
    res.json(results)
  })
});

//Get Specific Post with ID.
app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM posts where id = ?";
  db.query(sql, [id], (error, results) => {
    if(error) {
      throw error
    }

    //Also, check for the post exists or not
    if(results.length === 0) {
      return res.status(404).json({ error: 'Post with given Id is not available.' })
    }

    //Returns first result.
    res.json(results[0])
  })
});

//Create the New Posts.
app.post('/api/posts', (req, res) => {
  const {title, content} = req.body;
  const sql = "INSERT INTO posts (title, content) VALUES (?,?)";
  db.query(sql, [title, content], (error, results) => {
    if(error) {
      throw error
    }
    res.send('Post Created Successfully.')
  })
});

//Update the specific Posts.
app.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const {title, content} = req.body;
  const sql = "UPDATE posts set title = ?, content = ? WHERE id = ?";
  db.query(sql, [title, content, id], (error, results) => {
    if(error) {
      throw error
    }
    res.send('Post Created Successfully.')
  })
});

//Delete the specific Posts.
app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const {title, content} = req.body;
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, [id], (error, results) => {
    if(error) {
      throw error
    }
    res.send('Post Deleted Successfully.')
  })
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})