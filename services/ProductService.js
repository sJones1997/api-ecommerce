const ProductModel = require('../models').Products;

class ProductService {

    async createProduct(product){
        const {name, description, price, stock} = product;
        const newProduct = await ProductModel.create({
            name: name,
            description: description,
            price: price,
            stock: stock
        });

        return newProduct.id;
    }

    async getAllProducts(){
        const products = await ProductModel.findAll();
        return JSON.stringify(products);
    }

    async getProductById(id){
        const product = await ProductModel.findAll({
            attributes: ['name', 'description', 'price', 'stock'],
            where: {
                id: parseInt(id)
            }
        });
        return JSON.stringify(product);
    }

    async updateProduct(id, product){
        const {name, description, price, stock} = product
        const updatedProduct = await ProductModel.update({name:name, description: description, price:price, stock: stock}, {
            where:{
                id: id
            }
        });
        return updatedProduct;
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