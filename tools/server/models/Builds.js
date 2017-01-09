const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Build = new Schema({
    site_id: String,
    commit: String,
    ref: String,
    built_by: String,
    branch: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Build', Build);