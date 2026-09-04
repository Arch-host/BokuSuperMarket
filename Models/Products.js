const mongose = require('mongoose');
const productSchema = new mongose.Schema({
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
    timestamps: true //Date created and  modified
});
const Product = mongose.model('Product', productSchema); //create model from schema