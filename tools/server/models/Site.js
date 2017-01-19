const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Site = new Schema({
  platform: { type: Schema.Types.ObjectId, ref: 'Platform' },
  project: String,
  slug: String,
  paths: Array,
  domains: Array,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Site', Site);
