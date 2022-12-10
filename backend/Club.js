const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create our club schema
const ClubSchema = Schema({
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

// create our user schema
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    picture: {
        type: String,
        required: false,
        unique: false,
    }
});

const Clubs = mongoose.model("Club", ClubSchema, "db");
const Users = mongoose.model("User", UserSchema, "db");
module.exports = {
    Clubs, Users
}