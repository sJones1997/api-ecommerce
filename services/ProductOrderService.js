const ProductOrderModel = require('../models').Products_Orders;

class ProductOrderService {

    async addProductOrder(orderId, productId){
        return await ProductOrderModel.create({
            order_id: orderId, 
            product_id: productId
        })
        .then(data => {
            return true;
        })
        .catch(err => {
            console.log(err)
            return false;
        })        
    }

    async insertOrderItems(cartItems, orderId){
        let inserted = true
        let promises = cartItems.map(async (e) => {
            if(typeof(e) === 'object'){
                let quantity = parseInt(e.quantity);
                while(quantity > 0 && inserted){                     
                    inserted = await this.addProductOrder(orderId, e.id)  
                    quantity--                                      
                }
                return inserted;
            }        
        })
        return Promise.all(promises)
        .then(data =>{
            console.log(data)
            return data
        })
    
    }

    async getProductOrder(productOrderId){
        const getProductOrder = await ProductOrderModel.findAll({
            where: {
                id: productOrderId
            }
        });
        return JSON.stringify(getProductOrder);
    }

    async deleteProductOrder(productOrderId){
        const deleteProductOrder = await ProductOrderModel.destroy({
            where: {
                id: productOrderId
            }
        });
        return JSON.stringify(deleteProductOrder);
    }    

}

module.exports = ProductOrderService;