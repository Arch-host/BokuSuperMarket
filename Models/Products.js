const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    color: {
        type: String //optional property
    }
},
{timestamps: true} //Date created and  modified

);

//create model  from schema
const Product = mongoose.model('Product', productSchema); //create model from schema

module.exports = Product; //export the model to be used in other files