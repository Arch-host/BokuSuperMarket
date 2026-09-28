const express = require('express');
const router = express.Router();

// import authentication middleware
const { protect } = require('../Middleware/auth');

// import authorization middleware
const { authorize } = require('../Middleware/role')

// import product controller
const productController = require('../Controllers/ProductController');

//define the routes
router.post('/createproduct', protect, authorize('superadmin'), productController.createProduct);

router.put('/updateproduct/:id', protect, authorize('storekeeper'), productController.updateProduct);
router.get('/getproductbyid/:id', protect, productController.getProductById);
router.get('/getallproducts', protect, productController.getAllProducts);


router.delete('/deleteproduct/:id', protect, productController.deleteProduct);

//export the router to be used in other files
module.exports = router;