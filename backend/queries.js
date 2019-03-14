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

function getAllProperties(req, res, next) {
  db.any('SELECT * FROM property')
    .then(function(data) {
      res.status(200)
         .json({
           data
         })
    }).catch(function(err){
      console.log("An error occured while calling getAllProperties ", err);
    });
  }

  function getAllBuyingAgreements(req, res, next) {
    db.any("SELECT * FROM orders")
      .then(function(data) {
        res.status(200).json({
          data
        });
      })
      .catch(function(err) {
        console.log(
          "An error occured while calling getAllBuyingAgreements ",
          err
        );
      });
  }
  
  function approveAgreement(req, res, next) {
    db.any(
      "UPDATE orders SET status = ${status} WHERE propertyNumber = ${pNum}",
      {
        pNum: req.body.propertyNumber,
        status: "approved"
      }
    )
      .then(() => {
        db.any("DELETE FROM property WHERE propertyNumber =  ${pNum}", {
          pNum: req.body.propertyNumber
        });
      })
      .then(() => {})
      .catch(function(err) {
        console.log("An error occured while calling approveAgreement", err);
      });
  }
  
  function getAgreementInfo(req, res, next) {
    db.any("SELECT * FROM orders WHERE propertyNumber =  ${pNum}", {
      pNum: req.body.propertyNumber
    })
      .then(function(data) {
        res.status(200).json({
          data
        });
      })
      .catch(function(err) {
        console.log("An error occured while calling getAgreementInfor ", err);
      });
  }
  
  function getPermissions(req, res, next) {
    db.any("SELECT permissions FROM account WHERE email = ${email}", {
      email: req.body.user_email
    })
      .then(function(data) {
        res.status(200).json({
          data
        });
      })
      .catch(function(err) {
        console.log("An error occured while calling getPermissions ", err);
      });
  }
  



module.exports = {
    getAllUsers: getAllUsers,
    authenticateUser: authenticateUser,
    createUser: createUser,
    getAllProperties: getAllProperties,
    getAllBuyingAgreements: getAllBuyingAgreements,
    approveAgreement: approveAgreement,
    getAgreementInfo: getAgreementInfo,
    getPermissions: getPermissions
};
