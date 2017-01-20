const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Build = new Schema({
  // platform_id: { type: Schema.Types.ObjectId, ref: 'Platform' }, // Give an empty result on routes.
  platform_id: String,
  commit: String,
  ref: String,
  built_by: String,
  branch: String,
  images: Array,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Build', Build);
