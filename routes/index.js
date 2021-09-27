var express = require('express');
const indexRouter = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const authRouter = require('./auth');
indexRouter.use('/auth', authRouter);

const productRouter = require('./products');
indexRouter.use('/products', jwtMiddleware, productRouter);

const cartRouter = require('./cart');
indexRouter.use('/cart', jwtMiddleware, cartRouter);

const orderRouter = require('./order');
indexRouter.use('/order', jwtMiddleware, orderRouter);

const checkoutRouter = require('./checkout');
indexRouter.use('/checkout', jwtMiddleware, checkoutRouter);

module.exports = indexRouter;