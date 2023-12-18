const mongoose = require('mongoose')
const { models } = require('../model')


exports.MongoDB = {
    connect: async () => {
        await mongoose.connect("mongodb://127.0.0.1:27017/testNode1")
    },
    saveProduct: async (product) => {
        const p = new models.Product(product)
        const err = p.validateSync()
        if (err !== null && err !== undefined) {
            return Promise.reject(err.message)
        }
        await p.save()
        return Promise.resolve(p._id.toString())
    },
    //add pagination logic
    getAllProduct: async () => {
        let products = await models.Product.find().limit(10)
        return Promise.resolve(products)
    },
    getProduct: async (productId) => {
        let product = await models.Product.findById(productId)
        return Promise.resolve(product)
    },
    replaceProduct: async (productId, doc) => {
        await models.Product.validate(doc)
        let replacedProduct = await models.Product
            .findOneAndReplace({ _id: productId }, doc, { returnDocument: 'after' })
        return Promise.resolve(replacedProduct)
    },
    updateProduct: async (productId, doc) => {
        await models.Product.validate(doc)
        let updatedProduct = await models.Product
            .findOneAndUpdate({ _id: productId }, doc, { returnDocument: 'after' })
        return Promise.resolve(updatedProduct)
    },
    deleteProduct: async (productId) => {
        await models.Product
            .findOneAndDelete({ _id: productId })
    },
}