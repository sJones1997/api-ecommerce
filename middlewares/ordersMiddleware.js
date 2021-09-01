const OrderService = require('../services/OrderService');
const ProductOrderService = require('../services/ProductOrderService');

const instantiateOrders = (req, res, next) => {
    const orderService = new OrderService();
    const productOrderService = new ProductOrderService();
    req.body.orderService = orderService;
    req.body.productOrderService = productOrderService;
    next();
}

module.exports = instantiateOrders;