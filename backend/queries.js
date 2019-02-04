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

module.exports = {
    getAllUsers: getAllUsers
}