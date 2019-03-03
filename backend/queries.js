var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/myproperty';
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
    db.any('select * from account')
          .then(function (data) {
            res.status(200)
               .json({
                  users: data
              });
          }).catch(function(err) {
            return next(err);
          });
}


function authenticateUser(req, res, next) {
  // Authenticate user
  db.query('SELECT * FROM account WHERE email =  ${email} AND accountPassword = ${password}', {
          email: req.body.email,
          password: req.body.password
      })
      .then(function(data) {
          // Login failed
          if (JSON.stringify(data) == '[]') {
              res.status(404).json({
                  error: 'Incorrect username or password'
              });
          }

          // Sucessful login
          res.status(200)
              .json({
                  data
              });
      }).catch(function(err) {
          // Handle errors
      });
}


function createUser(req, res, next) {
  db.any('INSERT INTO account VALUES (${email}, ${password}, ${firstname}, ${lastname})', {
          email: req.body.email,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname
      })
      .then(data => {
          res.status(200)
              .json({
                  message: "New account created"
              });
      })
      .catch(error => {
          console.log(error)
          res.status(400)
              .json({
                  error: error.detail
              });
      });
}
 


module.exports = {
    getAllUsers: getAllUsers,
    authenticateUser: authenticateUser,
    createUser: createUser
}
