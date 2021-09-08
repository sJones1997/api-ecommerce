const express = require('express');
const app = express();
const cors = require('cors');
const corsMiddleware = require('./middlewares/cors');
require('dotenv').config();
const googleSetup = require('./passportStrategy/google');



app.use(cors(corsMiddleware));

app.get('/', (req, res, next) => {
    res.send("hello world");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');
app.use('/api', indexRouter);

module.exports = app;
