const express = require('express');
const orderRouter = express.Router();
const ordersMiddleware = require('../middlewares/ordersMiddleware');
module.exports = orderRouter;

orderRouter.use(ordersMiddleware);

orderRouter.post('/', async(req, res, next) => {

    const cart = await req.body.cartService.getUserCart(req.verifiedUserId);

    if(cart.id){

        const cartItems = await req.body.cartService.getAllCartItems(cart.id);
        const order = await req.body.orderService.createOrder(req.verifiedUserId);
        const insertOrderItems = await req.body.productOrderService.insertOrderItems(cartItems, order.id);

        if(!insertOrderItems.includes(false)){
            const orderItems = await req.body.orderService.getOrderItems(order.id);
            if(cartItems.length === orderItems.length){
                await req.body.productCartService.deleteAllCartItems(cart.id);
                return res.status(200).json({'message': orderItems, 'status': 1})
            }
        }
    } 
    res.status(404).json({'message': "Problem creating order", 'status': 1})
});

orderRouter.get('/', async (req, res, next) => {

    const allOrdersIds = await req.body.orderService.getUserOrders(req.verifiedUserId);
    const allOrders = await req.body.orderService.getAllOrderItems(allOrdersIds)
    if(allOrders){
        return res.status(200).json({'message': allOrders, 'status': 1});
    }
    return res.status(404).json({'message': 'No orders', 'status': 0});
    
});