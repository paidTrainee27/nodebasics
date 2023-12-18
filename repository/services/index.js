const { MongoDB } = require('../db/mongo')
exports.ProductService = {
    getAllProducts: (db) => {

    },
    saveProduct: (product) => {
        MongoDB.save(product).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }
}