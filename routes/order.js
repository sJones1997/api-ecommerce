const express = require('express');
const orderRouter = express.Router();
const ordersMiddleware = require('../middlewares/ordersMiddleware');
module.exports = orderRouter;

orderRouter.use(ordersMiddleware);

orderRouter.param('orderId', async (req, res, next, id) => {
    const orderService = req.body.orderService;
    let order = await orderService.getOrderById(id);
    order = JSON.parse(order);
    if(order.length){
        req.body.orderId = parseInt(id);
        req.body.orderStored = order[0];
        return next();
    }
    return res.status(404).send('Unable to find order');
});

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
    return res.status(404).send('No carts');
});

orderRouter.get('/:orderId', (req, res, next) => {
    return res.status(200).send(req.body.orderStored);
});

orderRouter.delete("/:orderId", async (req, res, next) => {
    const orderService = req.body.orderService;
    const deleteOrder = await orderService.deleteOrder(req.body.orderId);
    if(deleteOrder){
        return res.status(200).send('Order deleted');
    }
    return res.status(500).send("Problem deleting order");
});

orderRouter.param('productOrderId', async (req, res, next, id) => {
    const productOrderService = req.body.productOrderService;
    let productOrder = await productOrderService.getProductOrder(id);
    productOrder = JSON.parse(productOrder);
    if(productOrder.length){
        req.body.productOrderId = parseInt(id);
        req.body.productOrderStored = productOrder[0];
        return next();
    }
    return res.status(404).send('Unable to find order item');
});


orderRouter.post("/productOrder", async(req, res, next) => {
    const productOrderService = req.body.productOrderService;
    const newProductOrder = await productOrderService.addProductOrder(req.body.orderId, req.body.productId);
    if(newProductOrder){
        return res.status(200).send("Item added!");
    }
    return res.status(404).send("Problem adding product order");
})

orderRouter.get("/productOrder/:productOrderId", (req, res, next) => {
    res.status(200).send(req.body.productOrderStored);
})

orderRouter.delete("/productOrder/:productOrderId", async (req, res, next) => {
    const productOrderService = req.body.productOrderService;
    const deletedProductOrder = productOrderService.deleteProductOrder(req.body.productOrderId);
    if(deletedProductOrder){
        return res.status(200).send('Item deleted!');
    }
    return res.status(500).send("unable to delete product order");
});