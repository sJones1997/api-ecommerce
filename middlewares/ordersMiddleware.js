const OrderService = require('../services/OrderService');
const ProductOrderService = require('../services/ProductOrderService');
const ProductCartService = require('../services/ProductCartService');
const CartService = require('../services/CartService');
const CheckoutService = require('../services/CheckoutService');

const instantiateOrders = (req, res, next) => {
    const orderService = new OrderService();
    const productOrderService = new ProductOrderService();
    const cartService = new CartService();
    const productCartService = new ProductCartService();
    const checkoutService = new CheckoutService();
    req.body.orderService = orderService;
    req.body.productOrderService = productOrderService;
    req.body.productCartService = productCartService;
    req.body.cartService = cartService;
    req.body.checkoutService = checkoutService

    next();
}

module.exports = instantiateOrders;