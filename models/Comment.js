var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  zone: {type:String, default:''},
  username: {type:String, default:''},
  body: {type:String, default:''},
  timestamp: {type:Date, default:Date.now}
});

module.exports = mongoose.model('CommentSchema', CommentSchema);