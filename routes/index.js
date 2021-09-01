var express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users');
indexRouter.use('/users', userRouter);

const productRouter = require('./products');
indexRouter.use('/products', productRouter);

const cartRouter = require('./cart');
indexRouter.use('/cart', cartRouter);

module.exports = indexRouter;