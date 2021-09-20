const express = require('express');
const productRouter = express.Router();
const productMiddleware = require('../middlewares/productsMiddleware'); 
module.exports = productRouter;

productRouter.use(productMiddleware);

productRouter.param('productId', async (req, res, next, id) => {
    const productService = req.body.productService;
    const product = await productService.getProductById(id);
    if(product){
      req.body.productId = parseInt(id)
      req.body.productStored = product;
      return next();
    } 
    return res.status(404).send('Product not found');
})

//Create new Product
productRouter.post('/', async (req, res, next) => {
    req.body.name = req.body.name.toLowerCase();
    const productService = req.body.productService;
    const newProduct = await productService.createProduct(req.body);
    if(isNaN(newProduct) === false){
      return res.status(200).send('Product created!');
    }
    return res.status(500).send('Problem creating Product!');
});
  
productRouter.get('/', async (req, res, next) => {
    const productService = req.body.productService;
    const products = await productService.getAllProducts();
    if(products){
      return res.status(200).json({'message': products, 'status': 1});
    }
    return res.status(500).json({'message': 'Unable to find products!', 'status': 0})
});

productRouter.get('/:productId', async (req, res, next) => {
  if(req.body.productStored){
    return res.status(200).json({message: req.body.productStored, status: 1});
  }
  return res.status(500).json({message: 'Problem fetching product', status: 0});
})

productRouter.put('/:productId', async (req, res, next) => {
    const updatedProduct = await req.body.productService.updateProduct(req.body.productId, req.body);
    if(updatedProduct) {
      return res.status(200).send('Details updated successfully');
    }
    return res.status(400).send("Nothing to update");
})

productRouter.delete('/:productId', async (req, res, next) => {
    const productService = req.body.productService;
    const deleteProduct = await productService.deleteProduct(req.body.productId);
    if(deleteProduct){
      return res.status(200).send("Product successfully deleted")
    }
    return res.status(500).send('Unable to delete Product')
  })