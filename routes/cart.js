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

cartRouter.post('/', async(req, res, next) => {
    const cartService = req.body.cartService;
    const newCartId = await cartService.createCart(req.body.userId);
    if(newCartId){
        return res.status(200).send("cart created!");
    } 
    return res.status(404).send("Problem creating cart")
});

cartRouter.get('/', async (req, res, next) => {
    const cartService = req.body.cartService;
    const allCarts = await cartService.getAllCarts();
    if(allCarts){
        return res.status(200).send(allCarts);
    }
    return res.status(404).send('No carts');
});

cartRouter.get('/:cartId', (req, res, next) => {
    return res.status(200).send(req.body.cartStored);
});

cartRouter.delete("/:cartId", async (req, res, next) => {
    const cartService = req.body.cartService;
    const deleteCart = await cartService.deleteCart(req.body.cartId);
    if(deleteCart){
        return res.status(200).send('Cart deleted');
    }
    return res.status(500).send("Problem deleting cart");
})

cartRouter.get("/cartItems/:cartId", async (req, res, next) => {
    const cartItems = await req.body.cartService.getAllCartItems(req.body.cartId);
    if(cartItems){
        return res.status(200).json({'message': cartItems, 'status': 1})
    } 
    res.status(200).json({'message': cartItems, 'status': 1})
    
})

cartRouter.param('cartItemId', async (req, res, next, id) => {
    const productCartService = req.body.productCartService;
    let cartItem = await productCartService.getCartItem(id);
    cartItem = JSON.parse(cartItem);
    if(cartItem.length){
        req.body.cartItemId = parseInt(id);
        req.body.cartItemStored = cartItem[0];
        return next();
    }
    return res.status(404).send('Unable to find cart item');
});



cartRouter.post("/cartItem", async(req, res, next) => {
    const cart = await req.body.cartService.getUserCart(req.verifiedUserId)
    const newCartItems = await req.body.productCartService.insertCartItems(cart.id, req.body.productId, req.body.orderQuantity);
    if(newCartItems){
        return res.status(200).json({'message': "Item(s) added!", 'status': 1});
    }
    return res.status(500).json({'message': "Problem adding item(s)", 'status': 0});
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
});