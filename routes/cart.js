const express = require('express');
const cartRouter = express.Router();
const cartMiddleware = require('../middlewares/cartMiddleware');
module.exports = cartRouter;

cartRouter.use(cartMiddleware);

cartRouter.post('/', async(req, res, next) => {
    const cartService = req.body.cartService;
    const newCartId = await cartService.createCart(req.body.userId);
    if(newCartId){
        return res.status(200).send(newCartId);
    } 
    return res.status(404).send("Problem creating cart")
})

cartRouter.post("/cartitem", async(req, res, next) => {
    console.log(req.body)
    const cartService = req.body.cartService;
    const newCartItem = await cartService.addCartItem(req.body.cartId, req.body.productId);
    if(newCartItem){
        return res.status(200).send(newCartItem);
    }
    return res.status(404).send("Problem adding cart item");
})

cartRouter.get('/', async (req, res, next) => {
    const cartService = req.body.cartService;
    const allCartItems = await cartService.getAllCartItems();
    if(allCartItems){
        return res.status(200).send(allCartItems);
    }
    return res.status(404).send('No carts');
})