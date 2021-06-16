const express = require('express'),
    router = express.Router(),
    user = require('../models/user'),
    passport = require('passport'),
    jwt = require('jsonwebtoken');

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    User.addUser(newUser, (err, user) => {
        User.getUserByUsername(newUser.username, (err, data) => {
            if (data.username !== undefined) {
                console.log(data.username)
                res.status(400).json({
                    success: false,
                    message: "User Already exists"
                })               
            } else {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: "Failed to Register user"
                    })                 
                } else {
                    res.status(200).json({
                        success: true,
                        message: "User Register"
                    })
        
                }
            }
        })

        
    });
})

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.json({
        "message": "AUTHENTICATED"
    })
})

// Profile
router.get('/profile', (req, res, next) => {
    res.json({
        "message": "PROFILE"
    })
})

module.exports = router;