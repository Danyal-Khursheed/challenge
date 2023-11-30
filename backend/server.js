const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require('cors');
const router = require('./router/auth.js');
var bodyParser = require('body-parser')

env.config();

const { connect } = require('./database/db.js');
connect();

// middleware
app.use(express.json()); // This line enables JSON parsing

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// CORS middleware
app.use(cors());

// Your routes
app.use('/', router);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send("Hello from the home page");
});

app.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}`);
});
