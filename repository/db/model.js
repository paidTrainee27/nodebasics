const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    model: { type: String, required: true },
    year: { type: Number, default: new Date().getFullYear() },
    size: { type: String, required: true },
    colour: String,
    discount: { type: Number, max: [50, "Discount percentage can't be more than 50"] }
})

exports.models = {
    Product: mongoose.model('product', productSchema)
}