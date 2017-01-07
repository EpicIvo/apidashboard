let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Site = new Schema({
    platform: String,
    project: String,
    slug: String,
    paths: Array,
    domains: Array,
});

module.exports = mongoose.model('Sites', Site);