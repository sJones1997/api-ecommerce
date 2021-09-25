const express = require('express');
const checkoutRouter = express.Router();
const checkoutMiddleware = require('../middlewares/checkoutMiddleware');
module.exports = checkoutRouter;

checkoutRouter.use(checkoutMiddleware);

checkoutRouter.post('/create-payment-intent', async(req, res, next) => {

    const cart = await req.body.cartService.getUserCart(req.verifiedUserId);  

    if(cart.id){
        const cartItems = await req.body.cartService.getAllCartItems(cart.id);
        const clientSecret = await req.body.checkoutService.checkout(cartItems);   
        return res.status(200).json({'message': clientSecret, 'status': 1})
    }
    return res.status(500).json({'message': 'Error creating payment intent', 'status': 0})    
})


