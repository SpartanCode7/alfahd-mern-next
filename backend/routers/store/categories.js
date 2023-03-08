// Require necessary modules
const express = require('express');
const app = express() 
const router = express.Router()
const Cate = require('../../model/categories')
const multer = require('multer');

// Set headers to allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
    next()
})

// Route to get all categories
router.get('/', async (req, res) => {
    try {
        const cates = await Cate.find()
        res.json(cates)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Route to get a single category by ID
router.get('/:id', getCategories, (req, res) => {
    res.send(res.cate.name);
})

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') // Set the upload folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()) // Set the file name
    }
})

// Create middleware to handle file uploads
const upload = multer({ storage: storage })

// Route to create a new category
router.post('/', upload.single('file'), async (req, res) => {
    console.log(req.body)
    const cates = new Cate({
        name: req.body.name,
        slug: req.body.slug,
        image: req.file.filename, // Get the uploaded file name
        category: req.body.category
    })
    try {
        const newCate = await cates.save()
        res.status(201).json(newCate)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Route to update an existing category by ID
router.patch('/:id', getCategories, async (req, res) => {
    if (req.body.name != null) {
        res.cate.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.cate.subscribedToChannel = req.body.subscribedToChannel
    }    
    try {
        const updatedSubscriber = await res.cate.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Route to delete an existing category by ID
router.delete('/:id', getCategories, async (req, res) => {
    try {
        await res.cate.remove()
        res.json( { message: 'Deleted cates'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}) 

// Middleware to get a category by ID
async function getCategories(req, res, next) {
    let cate
    try {
        cate = await Cate.findById(req.params.id)
        if (cate == null) {
            res.status(404).json({ message: "No Category found."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.cate = cate
    next()
} 

module.exports = router
