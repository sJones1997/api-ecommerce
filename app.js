var express = require('express');

var app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');
app.use('/api', indexRouter);

module.exports = app;
