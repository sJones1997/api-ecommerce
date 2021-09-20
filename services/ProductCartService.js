const ProductCartModel = require('../models').Products_Cart;
const Products = require('../models').Products;
class ProductsCartsService {

    async addCartItem(cartId, productId, quantity){
        let itemsAdded = true;
        while(quantity > 0){
            if(itemsAdded === false){
                quantity = 0
            }            
            await ProductCartModel.create({
                cart_id: cartId, 
                product_id: productId
            })
            .then(data => {
                if(data){
                    quantity--;
                    return;
                }
            })
            .catch(err => {
                quantity = 0;
                itemsAdded = false
                return;
            })
        }
        if(itemsAdded){
            return true;
        }
        return false;
    }

    async getCartItem(cartItemId){
        const getCartItem = await ProductCartModel.findAll({
            where: {
                id: cartItemId
            }
        });
        return JSON.stringify(getCartItem);
    }

    async getAllCartItems(cartId){
        return await ProductCartModel.findAll({
            includ: [{
                model: Products
            }],
            where:{
                cart_id: cartId
            }
        })
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