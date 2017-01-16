const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Site = new Schema({
    platform: String,
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
