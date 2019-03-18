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
  db.getAllUsers(req, res);
});

app.get('/api/allProperties', (req, res) => {
  db.getAllProperties(req, res);
});

app.get('/api/property/:id', (req, res) => {
  db.getProperty(req, res);
});

app.put('/api/addProperty', (req, res) => {
  db.addProperty(req, res);
});

app.put('/api/updateProperty', (req, res) => {
  db.updateProperty(req, res);
});

app.delete('/api/deleteUser', (req, res) => {
  db.deleteUser(req, res);
});

app.post('/api/propertiesByOwner', (req, res) => {
  db.getPropertiesByOwner(req, res);
});

app.post('/api/getUserInfo', (req, res) => {
  db.getUserData(req, res);
});

app.post('/api/updateUserName', (req, res) => {
  db.updateUserName(req, res);
});

app.post('/api/updateUserPassword', (req, res) => {
  db.updateUserPassword(req, res);
});

app.post('/api/getUserOrders' , (req, res) => {
  db.getUserOrders(req, res);
});

app.put('/api/buyProperty', (req, res) => {
  db.buyProperty(req, res);
});

app.put('/api/cancelPurchase', (req, res) => {
  db.cancelPurchase(req, res);
});

app.delete('/api/deleteProperty', (req, res) => {
  db.deleteProperty(req, res);
});

app.get('/api/properties', db.getAllProperties);

app.listen(port, () => console.log(`Listening on port ${port}`));     

