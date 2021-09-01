const CartService = require('../services/CartService');
const ProductsCartsService = require('../services/ProductCartService');

const instantiateProducts = (req, res, next) => {
    const cartService = new CartService();
    const productCartService = new ProductsCartsService();
    req.body.cartService = cartService;
    req.body.productCartService = productCartService;
    next();
}

module.exports = instantiateProducts;