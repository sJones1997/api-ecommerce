var express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users');
indexRouter.use('/users', userRouter)

module.exports = indexRouter;