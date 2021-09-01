const ProductCart = require('../models').Products_Cart;

class ProductsCartsService {

    async addCartItem(cartId, productId){
        const addCartItem = await ProductCart.create({
            cart_id: cartId, 
            product_id: productId
        });
        return addCartItem.id;
    }

    async getCartItem(cartItemId){
        const getCartItem = await ProductCart.findAll({
            where: {
                id: cartItemId
            }
        });
        return JSON.stringify(getCartItem);
    }

    async deleteCartItem(cartItemId){
        const deleteCartItem = await ProductCart.destroy({
            where: {
                id: cartItemId
            }
        });
        return JSON.stringify(deleteCartItem);
    }


}

module.exports = ProductsCartsService