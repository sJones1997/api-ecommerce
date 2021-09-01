const CartService = require('../services/CartService');

const instantiateProducts = (req, res, next) => {
    const cartService = new CartService();
    req.body.cartService = cartService;
    next();
}

module.exports = instantiateProducts;