const ProductCartModel = require('../models').Products_Cart;

class ProductsCartsService {

    async addCartItem(cartId, productId){
        const addCartItem = await ProductCartModel.create({
            cart_id: cartId, 
            product_id: productId
        });
        return addCartItem.id;
    }

    async getCartItem(cartItemId){
        const getCartItem = await ProductCartModel.findAll({
            where: {
                id: cartItemId
            }
        });
        return JSON.stringify(getCartItem);
    }

    async deleteCartItem(cartItemId){
        const deleteCartItem = await ProductCartModel.destroy({
            where: {
                id: cartItemId
            }
        });
        return JSON.stringify(deleteCartItem);
    }


}

module.exports = ProductsCartsService