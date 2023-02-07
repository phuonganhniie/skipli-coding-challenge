const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({
    path: '.env'
})

// Require the routes
const user = require('./routes/user');
const github = require('./routes/github');

const app = express();

// Enable CORS
app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            if (!origin || ['http://localhost:3000'].includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allow to send request from origin.'));
            }
        }
    })
)

// Parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup the routes
app.use('/', user);
app.use('/', github);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(new Date() + ` Server listening on ${PORT}`);
})