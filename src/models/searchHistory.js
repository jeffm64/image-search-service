var mongoose = require("mongoose");

var searchHistorySchema = mongoose.Schema({
  timestamp: Number,
  query: String
});
searchHistorySchema.index({ timestamp: 1 });

var searchHistory = exports.SearchHistory = mongoose.model('searchHistory', searchHistorySchema);