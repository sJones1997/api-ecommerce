const CartModel = require('../models').Carts;
class CartService {

    async createCart(userId){
        const insertItem = await CartModel.create({
            user_id: userId
        });
        return insertItem.id;
    }

    async getAllCarts(){
        const allCarts = await CartModel.findAll();
        return JSON.stringify(allCarts);
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