const upload = require('../Middleware/upload');
const Product = require('../Models/Products');
const sendEmail = require('../Middleware/emailsender');

//create a product
exports.createProduct = async (req, res) => {
    try {

        //check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.quantity || !req.body.price) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const { name, image, size, description, price, quantity, color } = req.body;

        const product = new Product({ name, image, size, description, price, quantity, color });

        await product.save();

        //generate otp
        const otp = Math.floor(100000 + Math.random() * 900000); //generate a 6 digit otp 

        //send email notification to the admin when a new product is created
        const subject = 'New Product Created';
        const text = `A new product has been created: here is your otp: ${otp}\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color || 'N/A'}`;
        await sendEmail(process.env.EMAIL_USER, subject, text);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

//create a product with image upload
exports.createProductWithImage = async (req, res) => {
  try {
    const { name, size, description, price, quantity, color } = req.body;

    if (!name || !size || !description || !quantity || !price) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const product = new Product({
      name,
      size,
      description,
      price,
      quantity,
      color,
      image: req.file.path,
    });

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
        const { name, image, size, description, price, quantity, color } = req.body;

        const product = await Product.findByIdAndUpdate(id, { name, size, description, price, color, quantity }, { new: true });
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