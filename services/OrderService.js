const OrderModel = require('../models').Orders;

class OrderService {

    async createOrder(userId){
        const createOrder = await OrderModel.create({
            user_id: userId
        });
        return createOrder.id;
    }

    async getAllOrders(){
        const allOrders = await OrderModel.findAll();
        return JSON.stringify(allOrders);
    }

    async getOrderById(orderId){
        const order = await OrderModel.findAll({
            where: {
                id: orderId
            }
        });
        return JSON.stringify(order);
    }

    async deleteOrder(orderId){
        const deleteOrder = await OrderModel.destroy({
            where: {
                id: orderId
            }
        });
        return deleteOrder;
    }

}

module.exports = OrderService