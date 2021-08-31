const CartModel = require('../models').Cart;

class CartService {

    async createCartItem(item){
        const insertItem = CartModel.create({
            product_id: item.product_id
        });
        return insertItem.id;
    }

    async getAllCartItems(){

    }

    async getCartItemById(){

    }

    async updateCartItem(){

    }

    async deleteCart(){

    }

    async deleteCartItem(){

    }

}

module.exports = CartService;