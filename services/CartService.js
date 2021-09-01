const CartModel = require('../models').Cart;
const Models = require('../models');
class CartService {

    async createCartItem(item){
        const insertItem = CartModel.create({
            product_id: item.product_id
        });
        return insertItem.id;
    }

    async getAllCartItems(){
        const allCartItems = CartModel.findAll({
            include: [{
                model: Models.Products, 
                as: "product"
            }]
        })
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