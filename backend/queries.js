var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/myproperty';
var db = pgp(connectionString);

function getAllUsers(req, res, next) {
    db.any('select * from user_data')
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
    getAllProperties: getAllProperties
}