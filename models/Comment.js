var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  zone: {type:String, default:''},
  author: {type:mongoose.Schema.Types.Mixed, default:{}},
  body: {type:String, default:''},
  timestamp: {type:Date, default:Date.now}
});

module.exports = mongoose.model('CommentSchema', CommentSchema);