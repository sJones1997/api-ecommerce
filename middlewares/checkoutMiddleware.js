const CheckoutService = require('../services/CheckoutService');
const CartService = require('../services/CartService');
const instantiateCheckout = (req, res, next) => {
    req.body.checkoutService = new CheckoutService();
    req.body.cartService = new CartService();
    next();
}

module.exports = instantiateCheckout;