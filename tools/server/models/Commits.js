let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Commit = new Schema({
    platform: String,
    committed_by: String,
    project_url: String,
    branch: String,
    build: String,
    ref: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    images: []
});

module.exports = mongoose.model('Commit', Commit);