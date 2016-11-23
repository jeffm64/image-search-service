var express = require("express");
var mongoose = require("mongoose");
var mongodb = process.env.MONGODB_URI || "mongodb:https://image-search-service-jeff64.c9users.io/";

function mongooseInit(mongodb) {
  mongoose.Promise = global.Promise;
  mongoose.connect(mongodb);
};