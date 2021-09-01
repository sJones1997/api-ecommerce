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
    const orderService = req.body.orderService;
    const newOrderId = await orderService.createOrder(req.body.userId);
    if(newOrderId){
        return res.status(200).send("order created!");
    } 
    return res.status(404).send("Problem creating order")
});

orderRouter.get('/', async (req, res, next) => {
    const orderService = req.body.orderService;
    const allOrders = await orderService.getAllOrders();
    if(allOrders){
        return res.status(200).send(allOrders);
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
    console.log(newProductOrder)
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