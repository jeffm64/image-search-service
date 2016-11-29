var express = require("express");
var mongoose = require("mongoose");
var search = require("./api/search");

var mongodb = process.env.MONGODB_URI || "mongodb://http://localhost:8080/";
mongooseInit(mongodb);

function mongooseInit(mongodb) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongodb);
};

var app = express();
search(app);

module.exports = app;