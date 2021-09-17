const ProductModel = require('../models').Products;

class ProductService {

    async createProduct(product){
        const {name, description, price, stock} = product;
        return await ProductModel.create({
            name: name,
            description: description,
            price: price,
            stock: stock
        })
        .then(data => {
            console.log(data)
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
            attributes: ['name', 'description', 'price', 'stock'],
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
            attributes: ['name', 'description', 'price', 'stock'],
            where: {
                id: parseInt(id)
            }
        })
        .then(data => {
            return data.toJSON();
        })
        .catch(err => {
            console.log(err)
        })
    }

    async updateProduct(id, product){
        const {name, description, price, stock} = product
        await ProductModel.update({name:name, description: description, price:price, stock: stock}, {
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

    async deleteProduct(id){
        const deleteProduct = await ProductModel.destroy({
            where: {
                id: id
            }
        });
        return deleteProduct;
    }
}

module.exports = ProductService;