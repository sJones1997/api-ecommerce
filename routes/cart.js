const express = require('express');
const cartRouter = express.Router();
const cartMiddleware = require('../middlewares/cartMiddleware');
module.exports = cartRouter;

cartRouter.use(cartMiddleware);

cartRouter.get('/', async (req, res, next) => {
    const cartService = req.body.cartService;
    const allCartItems = await cartService.getAllCartItems();
    console.log(allCartItems);
})