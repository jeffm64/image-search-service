var express = require("express");
var express2 = defaultConvert(express);

var bing = require("bing.search");
var bing2 = defaultConvert(bing);

var search = new bing2.default("v2saqfFSvffL5FWI36G4lTvq6Bx/StC74MEtd/yy7CA");
var searchHistory = require("../models/searchHistory");

function defaultConvert(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createResults(image) {
  return {
    url: image.url,
    title: image.title,
    thumbnail: image.thumbnail.url,
    source: image.sourceUrl,
    type: image.type
  };
}

module.exports = app => {
  app.get("/search/:query", function (req, res) {
    // WARNING with this URL => Returns empty JSON
    var query = req.params.query;
    var offset = req.query.offset || 10;
    var timestamp = Date.now();

    search.images(query, function (error, results) {
      if (error) {
        res.status(500).json(error);
      } else {
        var queryHistory = new searchHistory.SearchHistory({ query: query, timestamp: timestamp });
        queryHistory.save();
        
        res.status(200).json(results.map(createResults));
      }
    });
  });

  app.get("/latest", function (req, res) {
    // ERROR with this URL => Never reaches 'then' in Promise
    searchHistory.SearchHistory.find()
      .select({ _id: 0, query: 1, timestamp: 1 })
      .sort({ timestamp: -1 })
      .limit(10)
      .then(function (results) {
        console.log(`Here are the results: ${results}`);
        res.status(200).json(results);
      });
  });
};
