

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Registration_Form");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        unique: true,
        required:true
    }
});

const Product = mongoose.model('Form_detail', ProductSchema);
module.exports = Product;
