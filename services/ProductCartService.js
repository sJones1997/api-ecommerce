const ProductCartModel = require('../models').Products_Cart;

class ProductsCartsService {

    async addCartItem(cartId, productId){
        
        return await ProductCartModel.create({
            cart_id: cartId, 
            product_id: productId            
        })
        .then(data => {
            if(data){
                return true;
            }
        })
        .catch(err => {
            console.log(err)
            return false;
        })        
    }

    async insertCartItems(cartId, productId, quantity){
        let inserted = false;
        while(quantity > 0){
            inserted = await this.addCartItem(cartId, productId);
            quantity--
        }
        return inserted;
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

    async deleteAllCartItems(cartId){
        return await ProductCartModel.destroy({
            where: {
                cart_id: cartId            
            }
        })
        .then(data => {
            if(data){
                return true
            }
            return false;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
    }


}

module.exports = ProductsCartsService