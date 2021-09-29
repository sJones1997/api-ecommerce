const ProductModel = require('../models').Products;

class ProductService {

    async createProduct(product){
        const {name, description, price} = product;
        return await ProductModel.create({
            name: name,
            description: description,
            price: price
        })
        .then(data => {
            if(data){
                return data.toJSON();
            }
            return false;
        })
        .catch(err => {
            console.log(err);
        })
    }

    async getAllProducts(){
        return await ProductModel.findAll({
            attributes: ['id','name', 'description', 'price'],
            raw:true
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getProductById(id){
        return await ProductModel.findAll({
            attributes: ['name', 'description', 'price'],
            raw: true,            
            plain: true,            
            where: {
                id: parseInt(id)
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err)
        })
    }

    async updateProduct(id, product){
        const {name, description, price} = product
        await ProductModel.update({name:name, description: description, price:price}, {
            where:{
                id: id
            }
        })
        .then(data => {
            return data.toJSON();
        })
        .catch(err => {
            console.log(err)
        })        
    }

    // async deleteProduct(id){
    //     const deleteProduct = await ProductModel.destroy({
    //         where: {
    //             id: id
    //         }
    //     });
    //     return deleteProduct;
    // }
}

module.exports = ProductService;