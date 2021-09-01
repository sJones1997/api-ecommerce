const ProductOrderModel = require('../models').Products_Orders;

class ProductOrderService {

    async addProductOrder(orderId, productId){
        const addProductOrder = await ProductOrderModel.create({
            order_id: orderId, 
            product_id: productId
        });
        return addProductOrder.id;
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