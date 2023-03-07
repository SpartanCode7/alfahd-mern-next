const mongoose = require('mongoose')

const Schema = mongoose.Schema
const categoriesSchma = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    image: { 
        type: String
    },
    discription: {
        type: String
    }
}) 

module.exports = mongoose.model('categories', categoriesSchma)