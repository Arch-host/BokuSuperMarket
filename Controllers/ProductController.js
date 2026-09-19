const Product = require('../Models/Products');

//create a product
exports.createProduct = async (req, res) => {
    try {

        //check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.quantity || !req.body.price) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const { name, size, description, price, quantity, color } = req.body;
        const product = new Product({ name, size, description, price, quantity });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        res.json(await Product.find());
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

//get a product by id
exports.getProductById = async (req, res) => {
    try {
        //id of the product to get
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
}

//update a product
exports.updateProduct = async (req, res) => {
    try {
        //id is the product to be updated
        const { id } = req.params; 
        const { name, size, description, price, quantity, color } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, quantity }, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({message: 'Product updated successfully', product });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message })
    }
}

//delete a product
exports.deleteProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({message: 'Product Deleted successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting product', error: error.message })
    }
}