var express = require('express');
const indexRouter = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const userRouter = require('./users');
indexRouter.use('/users', userRouter);

const authRouter = require('./auth');
indexRouter.use('/auth', authRouter);

const productRouter = require('./products');
indexRouter.use('/products', jwtMiddleware, productRouter);

const cartRouter = require('./cart');
indexRouter.use('/cart', jwtMiddleware, cartRouter);

const orderRouter = require('./order');
indexRouter.use('/order', jwtMiddleware, orderRouter);

module.exports = indexRouter;