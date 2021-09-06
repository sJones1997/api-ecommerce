var express = require('express');
const indexRouter = express.Router();

const userRouter = require('./users');
indexRouter.use('/users', userRouter);

const authRouter = require('./auth');
indexRouter.use('/auth', authRouter);

const productRouter = require('./products');
indexRouter.use('/products', productRouter);

const cartRouter = require('./cart');
indexRouter.use('/cart', cartRouter);

const orderRouter = require('./order');
indexRouter.use('/order', orderRouter);

module.exports = indexRouter;