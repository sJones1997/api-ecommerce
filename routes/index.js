var express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users');
indexRouter.use('/users', userRouter)

const productRouter = require('./products');
indexRouter.use('/products', productRouter)

module.exports = indexRouter;