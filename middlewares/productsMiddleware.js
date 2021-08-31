const ProductService = require('../services/ProductService');

const instantiateProducts = (req, res, next) => {
    const productService = new ProductService();
    req.body.productService = productService;
    next();
}

module.exports = instantiateProducts;