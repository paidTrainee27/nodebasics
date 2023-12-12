const express = require('express')
const { productHandler } = require('./handler')
// const crypto = require('crypto')
const router = express.Router()


//GET products or get product with id
router.get('/products', productHandler.getProducts)

//@POST request
router.post('/products', productHandler.addProduct)
//@UPDATE request
router.put('/products/:id', productHandler.updateProduct)
//@PACTH request
router.patch('/products/:id', productHandler.patchProduct)
//@DELETE request
router.delete('/products/:id', productHandler.deleteProduct)

exports.router = router