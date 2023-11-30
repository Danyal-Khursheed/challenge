const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug : {
        type: String,
        
    },
    price: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    }
});

const ProductModel = mongoose.model('ProductModel', productSchema);
module.exports = ProductModel;
