const CartModel = require('../models').Carts;
const CartProduct = require('../models').Products_Cart;
const Models = require('../models');
class CartService {

    async createCart(userId){
        console.log(userId)
        const insertItem = CartModel.create({
            user_id: userId
        });
        return insertItem.id;
    }

    async addCartItem(cartId, productId){
        const insertCartItem = Products_Cart.create({
            cart_id:cartId,
            product_id: productId
        });
        return insertCartItem.id;
    }

    async getAllCartItems(){
        const allCartItems = CartModel.findAll();
        return JSON.stringify(allCartItems);
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