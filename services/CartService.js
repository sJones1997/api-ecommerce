const CartModel = require('../models').Carts;
const Products = require('../models').Products;
const sequelize = require('sequelize')

class CartService {

    async createCart(userId){
        return await CartModel.create({
            user_id: userId
        })
        .then(data => {
            return data.toJSON();
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getAllCarts(){
        const allCarts = await CartModel.findAll();
        return JSON.stringify(allCarts);
    }

    async getUserCart(userId){
        return await CartModel.findAll({
            plain: true, 
            raw: true,
            where:{
                user_id: userId
            }
        })
        .then(data => {
            if(data){
                return data;
            }
            return false;
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getCartById(cartId){
        const cart = await CartModel.findAll({
            where: {
                id: cartId
            }
        });
        return JSON.stringify(cart);
    }

    async getAllCartItems(cartId){
        return await CartModel.findAll({
            attributes: [[sequelize.fn('count', 'Products.id'), 'quantity'], 'Products.id',  'Products.name', 'Products.description', [sequelize.fn('sum', sequelize.col('Products.price')), 'totalProductPrice'], 'Products.price'],
            raw: true,          
            include: [{
                model: Products,
                as: 'Products',
                require: true,
                attributes: [],
                through: {attributes:[]}
            }],
            where:{
                id: cartId
            },
            group: ['Products.id', 'Products.name', 'Products.description', 'Products.price']
        })
        .then(data => {
            if(data[0].id !== null){
                return data;
            }
            return false;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
    }    

    async deleteCart(cartId){
        const deleteCart = await CartModel.destroy({
            where: {
                id: cartId
            }
        });
        return deleteCart;
    }
}

module.exports = CartService;