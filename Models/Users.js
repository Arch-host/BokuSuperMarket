const mongose = require('mongoose');
const bcrypt = require('bcrypt.js');

const UserSchema = new mongose.Schema({
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
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }, 
    
    timestamps: true //Date created and  modified 
});

const User = mongose.model('User', UserSchema); //Create model from schema 