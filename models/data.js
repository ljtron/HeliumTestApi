const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const dataFromHelium = new Schema({
  body: String,
  date: Date,
  device: String,
  data: String
});

module.exports = mongoose.model('DataModel', dataFromHelium);