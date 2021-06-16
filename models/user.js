const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    return User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username}
    return User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}