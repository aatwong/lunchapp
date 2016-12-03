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

module.exports = router;
