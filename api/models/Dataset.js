const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const DatasetSchema = new Schema({
  title: String,
  summary: String,
  content: String,
  coverimage: String,
  dataset: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const DatasetModel = model('Dataset', DatasetSchema);

module.exports = DatasetModel;
