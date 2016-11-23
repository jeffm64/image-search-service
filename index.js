var appFile = require("./src/app").app;
var express = require("express");

var app = express();

app.listen(process.env.PORT || 8080, function () {
  console.log("App listening on port 8080!");
});