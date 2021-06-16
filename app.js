const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    config = require('./config/database');

// Connect to database
mongoose.connect(config.database);
mongoose.connection.on('connnected', () => {
    console.log(`Connected to database ${config.database}`)
})
mongoose.connection.on('error', (err) => {
    console.log(`Database error : ${err}`)
})

// Port to start the server
const port = 3000;
const app = express();
const users = require('./routes/users');

// CORS middleware
app.use(cors());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
// Body parser middle ware for JSON
app.use(bodyParser.json())


// Express routing to Users
app.use('/users', users)

// Index route
app.get('/', (req, res) => {
    res.json({
        message:"Invalid route"
    })
})

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})