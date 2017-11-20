var mongoose = require('mongoose');

var ZoneSchema = new mongoose.Schema({
  name: {type:String, default:''},
  zipCodes: {type:Array, default:[]},
  timestampt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('ZoneSchema', ZoneSchema);