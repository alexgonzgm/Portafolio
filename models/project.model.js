var mongoose = require('mongoose');

var projecSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    langs: String,
    year: Number,
    image: String
});

module.exports = mongoose.model("project", projecSchema);