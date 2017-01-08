let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Site = new Schema({
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