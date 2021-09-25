const OrderModel = require('../models').Orders;
const Products = require('../models').Products;
const sequelize = require('sequelize')

class OrderService {

    async createOrder(userId){
        return await OrderModel.create({
            user_id: userId
        })
        .then(data => {
            return data.toJSON();
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getUserOrders(userId){
        return await OrderModel.findAll({
            attributes: ['id'],
            raw: true,        
            where: {
                user_id: userId
            }, 
            order: [['createdAt', 'DESC']]      
        })
        .then(data => {
            if(data){
                return data;
            }
            return false;
        })
        .catch(err => {
            console.log(err)
            return false;
        })
    }

    async getAllOrderItems(orderIds){
        let promises = orderIds.map(async (e) => {
            return await this.getOrderItems(e.id) 
        })

        return Promise.all(promises)
        .then(data => {
            return data
        })
    }

    async getOrderItems(orderId){
        return await OrderModel.findAll({
            attributes: ['Orders.id', [sequelize.fn('count', 'Products.id'), 'count'],'Products.id', 'Products.name', 'Products.price', 'Orders.createdAt'],   
            include: [{
                model: Products,
                attributes: [],
                require: true,
                through: {attributes: []},
                as: 'Products'
            }],
            where:{
                id: orderId
            },
            group: ['Orders.id', 'Products.id', 'Products.name', 'Products.price'],
            raw: true
        })
        .then(data => {
            if(data.length){
                return data;
            }
            return false;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
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