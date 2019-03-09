const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
var db = require('./backend/queries');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});


app.post('/api/login', (req, res) => {
  // Authenticate (existing) user
  if(req.body.signUp == false) {
    db.authenticateUser(req,res,null);
  } else {
    // Create new user
    db.createUser(req,res,null);
  }
});


app.get('/api/users', (req, res) => {
  console.log(db.getAllUsers(req, res));
});

app.get('/api/properties', db.getAllProperties);

app.listen(port, () => console.log(`Listening on port ${port}`));     

