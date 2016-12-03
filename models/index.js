var fs = require("fs");  //file system
var path = require("path");
var nconf = require('nconf');
nconf.env().file({ file: __dirname + '/../config/config.json' }); 

//retrieving user credentials from config.json
var db_name = nconf.get("db_name");
var db_user = nconf.get("db_user");
var db_host = nconf.get("db_host");
var db_password = nconf.get("db_password");
var db_dialect = nconf.get("db_dialect");
var db_port = nconf.get("db_port");

var SequelizeLibrary = require('sequelize');
var sequelizeDb = new SequelizeLibrary(db_name, db_user, db_password, {
  host: db_host,
  dialect: db_dialect,
  port: db_port
});

var db = {};


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelizeDb.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelizeDb;
db.Sequelize = SequelizeLibrary;

module.exports = db;  //e.g. used in routes/to-do.js
