var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://USERNAME:PASSWORD@localhost:5432/myproperty';
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
  db.any('SELECT * from UserData')
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

function addUser(req, res, next) {
  var params = req.params;
  var sql = 'INSERT INTO UserData (email, userPassword, firstName, lastName, phoneNumber, userTypeID) VALUES \
            (' + 
            '\'' + params.email + '\',' +
            '\'' + params.userPassword + '\','  +
            '\'' + params.firstName + '\','  +
            '\'' + params.lastName + '\','  
            + params.phoneNumber + ','  
            + params.userTypeID +    
            ')';
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
  var params = req.params; 
  var sql = 'SELECT permissions, accountname, accountpassword, phone, rating from account where email = '
  + '\'' + params.email + '\'';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                userInfo: data
              });
        }).catch(function (err) {
          return next(err);
        });
}

function getUserOrders(req, res, next) {
  var params = req.params; 
  var sql = 'SELECT orders.orderNumber, orders.date, orders.listedPrice, \
  orders.propertyNumber, payments.method, payments.amount \
  FROM orders \
  INNER JOIN payments on payments.orderNumber = orders.orderNumber WHERE email = ' + '\'' + params.email + '\'';

  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                orders: data
              });
        }).catch(function (err) {
          return next(err);
        });
} 

function updateUserName(req, res, next) {
  var params = req.params;
  var sql = 'UPDATE account SET accountName = ' + '\'' + params.newUserName + '\'' + ' WHERE email = ' + '\'' + params.email + '\'';
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                status: 'Successfully changed user name.'
              });
        }).catch(function (err) {
          return next(err);
        });
}

function updateUserPassword(req, res, next) {
  var params = req.params;
  var sql = 'UPDATE account SET accountpassword = ' + '\'' + params.newPassword + '\'' + ' WHERE email = ' + '\'' + params.email + '\'' ;
  db.any(sql)
        .then(function (data) {
          res.status(200)
              .json({
                status: 'Success'
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

module.exports = {
    getAllUsers: getAllUsers,
    getAllProperties: getAllProperties,
    getProperty: getProperty,
    addProperty: addProperty,
    updateProperty: updateProperty,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUserName: updateUserName,
    updateUserPassword: updateUserPassword,
    buyProperty: buyProperty,
    cancelPurchase: cancelPurchase,
    deleteProperty: deleteProperty,
    getUserOrders: getUserOrders,
    getUserData: getUserData
}