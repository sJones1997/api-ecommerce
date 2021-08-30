var express = require('express');

var app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var indexRouter = require('./routes/index');
app.use('/api', indexRouter);

const PORT = process.env.PORT || 3000;

//Listen on port 3000
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})


module.exports = app;
