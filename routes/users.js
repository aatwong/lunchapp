var express = require('express');
var router = express.Router();

var Models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  Models.users.findAll().then(function(usersTableData) {
    res.json({"results": usersTableData});
  });
});

/* Adding a new user */
router.post('/users', function(req, res, next) {
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.office);
  Models.users.create({ email: req.body.email, password: req.body.password, office: req.body.office}).then(function(users) {
    res.send(users);
  });
});


module.exports = router;
