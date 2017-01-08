const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Platform = new Schema({
    name: String,
    slug: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Platform', Platform);