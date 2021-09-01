const express = require('express');
const cartRouter = express.Router();
const cartMiddleware = require('../middlewares/cartMiddleware');
module.exports = cartRouter;

cartRouter.use(cartMiddleware);

cartRouter.post('/', async(req, res, next) => {
    const cartService = req.body.cartService;
    console.log()
    const newCartId = await cartService.createCart(req.body.userId);
    if(newCartId){
        return res.status(200).send(newCartId);
    } 
    return res.status(404).send("Problem creating cart")
})

cartRouter.get('/', async (req, res, next) => {
    const cartService = req.body.cartService;
    const allCartItems = await cartService.getAllCartItems();
    if(allCartItems){
        return res.status(200).send(allCartItems);
    }
    return res.status(404).send('No carts');
})