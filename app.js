const express = require('express');
const app = express();
const cors = require('cors');
const corsMiddleware = require('./middlewares/cors');
require('dotenv').config();
const googleSetup = require('./passport/google');

app.use(cors(corsMiddleware));

app.use((req, res, send) => {
    if(req.headers.authorization){
        console.log(req.headers.authorization);
    } else {
        res.send("What are you doing??")
    }
})

app.get('/', (req, res, next) => {
    res.send("hello world");
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');
app.use('/api', indexRouter);

app.listen(process.env.PORT || 3001, function () {
    console.log(`Listening on port ${process.env.PORT || 3001}`);
});

module.exports = app;
