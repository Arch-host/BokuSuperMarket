const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hasAdminAccess: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'storekeeper', 'salesperson'],
        default: 'salesperson'
    },  
}, {timestamps: true}); //Date created and  modified


//Create model from schema 
const User = mongoose.model('User', UserSchema);

module.exports = User; // export model to be used in other file