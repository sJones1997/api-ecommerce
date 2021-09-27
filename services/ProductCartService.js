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
            return false;
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

    async getCartItemId(cartId, productId){
        return await ProductCartModel.findAll({
            attributes: ['id'],
            raw: true, 
            where: {
                cart_id: cartId,
                product_id: productId
            },
            limit: 1
        })
        .then(data => {
            if(data){
                return data[0].id
            }
        })
        .catch(err => {
            console.log(data)
        })
    }

    async deleteCartItemById(itemId){
        return await ProductCartModel.destroy({
            where: {
                id: itemId
            }
        })
        .then(data => {
            if(data){
                return true;
            }
            return false;
        })
        .catch(err => {
            return false;
        })
    }

    async updateCartItems(currentCartItems, updatedItems, cartId){
        console.log(updatedItems)
        const difference = updatedItems.map(e => {
            return currentCartItems.find(el => {
                if(el.id === e.id){
                    return el['difference'] = e.quantity - el.quantity;
                }
            })
        })
         
         let resultArray =difference.map(async e => {
            if(e !== undefined){            
                let result = false;                
                if(e.difference > 0){
                    while(e.difference > 0){
                        result = await this.addCartItem(cartId, e.id)
                        e.difference--                        
                    }
                    return result;
                } else if (e.difference < 0){
                    while(e.difference < 0){
                        let cartItemId = await this.getCartItemId(cartId, e.id);
                        result = await this.deleteCartItemById(cartItemId);
                        e.difference++                       
                    }
                    return result;                    
                }                       
            } else {
                return {'status': 1, 'message' : 'Nothing to update'}
            }    
        })
        return Promise.all(resultArray)
        .then(data => {
            return data
        })
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