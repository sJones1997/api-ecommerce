const express = require('express');
const cartRouter = express.Router({strict: true});
const cartMiddleware = require('../middlewares/cartMiddleware');
module.exports = cartRouter;

cartRouter.use(cartMiddleware);

cartRouter.get('/userCart', async (req, res, next) => {
    const cart = await req.body.cartService.getUserCart(req.verifiedUserId)
    if(cart){
        return res.status(200).json({"message": cart.id, "status": 1})
    }
    return res.status(404).json({"message": "Unable to find cart", "status": 0})
})

cartRouter.param('cartId', async (req, res, next, id) => {
    const cartService = req.body.cartService;
    let cart = await cartService.getCartById(id);
    cart = JSON.parse(cart);
    if(cart.length){
        req.body.cartId = parseInt(id);
        req.body.cartStored = cart[0];
        return next();
    }
    return res.status(404).send('Unable to find cart');
});

cartRouter.get('/:cartId', (req, res, next) => {
    return res.status(200).send(req.body.cartStored);
});


cartRouter.get("/cartItems/:cartId", async (req, res, next) => {
    const cartItems = await req.body.cartService.getAllCartItems(req.body.cartId);
    if(cartItems){
        return res.status(200).json({'message': cartItems, 'status': 1})
    } 
    res.status(200).json({'message': cartItems, 'status': 1})
    
})

cartRouter.post("/cartItem", async(req, res, next) => {
    const cart = await req.body.cartService.getUserCart(req.verifiedUserId)
    const newCartItems = await req.body.productCartService.insertCartItems(cart.id, req.body.productId, req.body.orderQuantity);
    if(newCartItems){
        return res.status(200).json({'message': "Item(s) added!", 'status': 1});
    }
    return res.status(500).json({'message': "Problem adding item(s)", 'status': 0});
})

cartRouter.put('/cartItem', async(req, res) => {
    const updatedItems = req.body.items;
    const userId = req.verifiedUserId;
    const userCart = await req.body.cartService.getUserCart(userId);
    const currentCartItems = await req.body.cartService.getAllCartItems(userCart.id);
    const updatedCart = await req.body.productCartService.updateCartItems(currentCartItems, updatedItems, userCart.id);
    if(updatedCart.length){
        return res.status(200).json({'message': updatedCart, 'status': 1})
    }
    res.status(500).json({'message': 'Unable to update cart', 'status': 0})
})