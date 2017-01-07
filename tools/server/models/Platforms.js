const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Platform = new Schema({
    name: String,
    slug: String
});

module.exports = mongoose.model('Platforms', Platform);