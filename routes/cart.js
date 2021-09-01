const express = require('express');
const cartRouter = express.Router();
const cartMiddleware = require('../middlewares/cartMiddleware');
module.exports = cartRouter;

cartRouter.use(cartMiddleware);

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

cartRouter.param('cartItemId', async (req, res, next, id) => {
    console.log(id)
    const productCartService = req.body.productCartService;
    let cartItem = await productCartService.getCartItem(id);
    cartItem = JSON.parse(cartItem);
    if(cartItem.length){
        req.body.cartItemId = parseInt(id);
        req.body.cartItemStored = cartItem[0];
        return next();
    }
    return res.status(404).send('Unable to find cart');
});

cartRouter.post('/', async(req, res, next) => {
    const cartService = req.body.cartService;
    const newCartId = await cartService.createCart(req.body.userId);
    if(newCartId){
        return res.status(200).send("cart created!");
    } 
    return res.status(404).send("Problem creating cart")
})


cartRouter.get('/', async (req, res, next) => {
    const cartService = req.body.cartService;
    const allCarts = await cartService.getAllCarts();
    if(allCarts){
        return res.status(200).send(allCarts);
    }
    return res.status(404).send('No carts');
})

cartRouter.get('/:cartId', (req, res, next) => {
    return res.status(200).send(req.body.cartStored);
})

cartRouter.delete("/:cartId", async (req, res, next) => {
    const cartService = req.body.cartService;
    const deleteCart = await cartService.deleteCart(req.body.cartId);
    if(deleteCart){
        return res.status(200).send('Cart deleted');
    }
    return res.status(500).send("Problem killing cart");
})


cartRouter.post("/cartItem", async(req, res, next) => {
    const productCartService = req.body.productCartService;
    const newCartItem = await productCartService.addCartItem(req.body.cartId, req.body.productId);
    if(newCartItem){
        return res.status(200).send("Item added!");
    }
    return res.status(404).send("Problem adding cart item");
})

cartRouter.get("/cartItem/:cartItemId", (req, res, next) => {
    res.status(200).send(req.body.cartItemStored);
})

cartRouter.delete("/cartItem/:cartItemId", async (req, res, next) => {
    const productCartService = req.body.productCartService;
    const deletedCartItem = productCartService.deleteCartItem(req.body.cartItemId);
    if(deletedCartItem){
        return res.status(200).send('Item deleted!');
    }
    return res.status(500).send("unable to delete cart item");
})