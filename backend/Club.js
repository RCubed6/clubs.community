const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create our Meal schema
const Club = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: false,
    },
    leads: {
        type: [String],
        required: false,
        unique: false,
    },
    teachers: {
        type: [String],
        required: false,
        unique: false,
    },
    categories: {
        type: String,
        required: false,
        unique: false,
    },
    emails: {
        type: [String],
        required: false,
        unique: false,
    },
    members: {
        type: [String],
        required: false,
        unique: false,
    }

});

module.exports = mongoose.model("Club", Club);