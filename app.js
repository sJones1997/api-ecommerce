const express = require('express');
const app = express();
const cors = require('cors');
const corsMiddleware = require('./middlewares/cors');
require('dotenv').config();
const passport = require('passport');
const googleSetup = require('./passport/google');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsMiddleware));

app.use(cookieParser());

app.use(passport.initialize());

var indexRouter = require('./routes/index');
app.use('/api', indexRouter);

app.listen(process.env.PORT || 3001, function () {
    console.log(`Listening on port ${process.env.PORT || 3001}`);
});

module.exports = app;
