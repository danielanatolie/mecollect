const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
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
  console.log(req.body);
  if (req.body.email == 'pass' && req.body.password == 'pass') {
      console.log("Successful login");
      res.send(
          `Sucessful login`,
      );
  } else {
      console.log("Login failed");
      res.send(
          `Login failed`,
      );
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));