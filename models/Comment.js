var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  username: {type:String, default:''},
  body: {type:String, default:''},
  timestampt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('CommentSchema', CommentSchema);