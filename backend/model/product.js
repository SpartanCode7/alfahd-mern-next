const mongoose = require('mongoose')

const Schema = mongoose.Schema
const productSchma = new Schema({
    name: {
        type: String
    },
    discription: {
        type: String
    },
    permalink: {
        type: String
    },
    location: {
        type: String
    },
    price: {
        type: String
    },
    discount: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String,
        enum: ['Mens Fashion', 'Women Fashion', 'Bedding', 'Sofa Covers', 'Waterproof', 'Accessories']
    },
    currency: {
        type: String
    }
}) 

module.exports = mongoose.model('products', productSchma)