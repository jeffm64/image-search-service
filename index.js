var app = require("./src/app");
var express = require("express");
var path = require("path");

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.PORT || 8080, function () {
  console.log("App listening on port 8080!");
});