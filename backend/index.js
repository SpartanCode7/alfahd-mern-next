if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
require("./config/db").connect()
var app = express()
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}));

const router = express.Router()
const register = require("./routers/auth/register")
const verifyToken = require("./middleware/auth")
const login = require('./routers/auth/login')
const products = require('./routers/store/products')
const categories = require('./routers/store/categories')
const cors = require('cors');

const User = require('./model/user')

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*") 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
  next()
})

// Import Port Variable
const { API_PORT } = process.env

app.get('/', (req, res) => {
    res.send("Welcome to Home")
})
 
app.use('/products', products)
app.use('/categories', categories)
app.use('/', register)
app.use('/', login)
app.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ")
})

app.listen(API_PORT, () => {
  console.log(`http://localhost:${API_PORT}`)
})
 