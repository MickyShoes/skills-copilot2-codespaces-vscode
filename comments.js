// Create web server
// use express framework
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// use body parser to parse request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set up route
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/comments', (req, res) => {
  let comment = req.body.comment;
  let name = req.body.name;
  let email = req.body.email;

  if (comment && name && email) {
    fs.appendFile('comments.txt', `Name: ${name}, Email: ${email}, Comment: ${comment}\n`, (err) => {
      if (err) {
        console.log('Error: ', err);
        res.render('error');
      } else {
        res.render('thanks');
      }
    });
  } else {
    res.render('error');
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});