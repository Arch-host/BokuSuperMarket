const express = require('express');
const router = express.Router();

// import product controller
const productController = require('../Controllers/ProductController');

//define the routes
router.post('/createproduct', productController.createProduct);

router.get('/getallproducts', productController.getAllProducts);

router.get('/getproduct/:id', productController.getProductById);

router.put('/updateproduct/:id', productController.updateProduct);

router.delete('/deleteproduct/:id', productController.deleteProduct);

//export the router to be used in other files
module.exports = router;