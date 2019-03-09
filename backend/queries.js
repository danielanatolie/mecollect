var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/myproperty';
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
  db.any('SELECT * from account')
        .then(function (data) {
          res.status(200)
              .json({
                users: data
               });
        }).catch(function(err) {
          return next(err);
        });
}

function getAllProperties(req, res, next) {
  db.any('SELECT * from Properties') //NEED JOINS ON LOCATION, ETC
        .then(function (data) {
          res.status(200)
              .json({
                properties: data
              });
        }).catch(function(err) {
          return next(err);
        });
}

function getProperty(req, res, next) {
  var sql = 'SELECT originalPrice, size, yearBuilt, propertyTypeID, typeIDIndex \
  FROM Properties \
  WHERE propertyID = ' + req.params.id;
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                property: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function addProperty(req, res, next) {
  var sql = '';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                property: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function updateProperty(req, res, next) {
  var sql = '';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                property: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function deleteUser(req, res, next) {
  var params = req.params;
  var sql = 'UPDATE UserData SET deleted = 1 WHERE userID = ' + params.id;  
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                user: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function deleteProperty(req, res, next) {
  var sql = '';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                property: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function getUserData(req, res, next)
{
  db.any('SELECT permissions, accountname, accountpassword, phone, rating from account where email = ${email}', {
    email: req.body.email  
  }).then(function (data) {
        res.status(200)
            .json({
              userInfo: data
            });
      }).catch(function (err) {
        return next(err);
      });
}

function getUserOrders(req, res, next) {
  db.any('SELECT orders.orderNumber, orders.date, orders.listedPrice, \
          orders.propertyNumber, payments.method, payments.amount \
          FROM orders \
          INNER JOIN payments on payments.orderNumber = orders.orderNumber WHERE email = ${email}', {
    email: req.body.email
  }).then(function (data) {
        res.status(200)
            .json({
              data
            });
      }).catch(function (err) {
        return next(err);
      });
} 

function updateUserName(req, res, next) {
  db.any('UPDATE account SET accountName = ${newUserName} WHERE email = ${email}', {
    newUserName: req.body.newUserName,
    email: req.body.email
  }).then(function (data) {
        res.status(200)
            .json({
              status: 'Successfully changed user name.'
            });
      }).catch(function (err) {
        return next(err);
      });
}

function updateUserPassword(req, res, next) {
  db.any('UPDATE account SET accountpassword = ${newPassword} WHERE email = ${email}', {
    newPassword: req.body.newPassword,
    email: req.body.email
  }).then(function (data) {
        res.status(200)
            .json({
              status: 'Successfully changed password.'
            });
      }).catch(function (err) {
        return next(err);
      });
}

function buyProperty(req, res, next) {
  var sql = '';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                property: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function cancelPurchase(req, res, next) {
  var sql = '';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                property: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function deleteProperty(req, res, next) {
  var sql = '';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                property: data
              });
        }).catch(function (err) {
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

module.exports = {
    getAllUsers: getAllUsers,
    getAllProperties: getAllProperties,
    getProperty: getProperty,
    addProperty: addProperty,
    updateProperty: updateProperty,
    deleteUser: deleteUser,
    updateUserName: updateUserName,
    updateUserPassword: updateUserPassword,
    buyProperty: buyProperty,
    cancelPurchase: cancelPurchase,
    deleteProperty: deleteProperty,
    getUserOrders: getUserOrders,
    getUserData: getUserData,
    authenticateUser: authenticateUser,
    createUser: createUser,
    getAllProperties: getAllProperties
}
