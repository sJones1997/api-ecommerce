const CartModel = require('../models').Carts;
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