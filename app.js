const express = require('express')
const bodyParser = require("body-parser");
const cors=require('cors')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/pgw', require('./route/pgw'));

module.exports = app;