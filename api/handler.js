//Imports
const fs = require("fs")
const { MongoDB } = require('../repository/db/mongo')
// const { ProductService } = require('../repository/services')
//vars
let products = []
//Inits
getData((err, res) => {
    // console.log(res)
    products = JSON.parse(res)
})

function getData(callback) {
    fs.readFile("dummy.json", "utf-8", callback)
}

exports.productHandler = {

    getProducts: (req, res) => {
        // res.status(200).send("Hello world").end()
        //url params requires url path to have mandotory params
        // params = req.params 
        //query have params as optional/?id=1
        const q = req.query
        // console.log(q)
        //get single product
        if (q.id) {
            MongoDB.getProduct(q.id)
                .then((results) => {
                    res.status(200).json(results).end()
                }).catch((err) => {
                    res.status(500).json({ "error": err }).end()
                });
            return
        }
        MongoDB.getAllProduct()
            .then((results) => {
                res.status(200).json(results).end()
            }).catch((err) => {
                res.status(500).json({ "error": err }).end()
            });
    },
    addProduct: (req, res) => {
        const b = req.body
        if (typeof b === undefined || Object.keys(req.body).length == 0) {
            res.status(403).json({}).end()
            return
        }
        // ProductService.saveProduct(b)
        MongoDB.saveProduct(b).then((newId) => {
            // console.log(newId)
            return res.status(200).json({ _id: newId, ...b }).end()
        }).catch((err) => {
            // console.log(err)
            return res.status(403).json({ "error": err }).end()
        })
    },
    updateProduct: (req, res) => {
        const b = req.body
        const params = req.params
        if (params.id == undefined || params.id == '') {//only required during query param
            res.status(400).json({}).end()
            return
        }
        if (typeof b === undefined || Object.keys(req.body).length == 0) {
            res.status(400).json({}).end()
            return
        }
        // console.log(params.id)
        MongoDB.replaceProduct(params.id, b)
            .then((result) => {
                res.status(200).json(result).end()
            }).catch((err) => {
                res.status(400).json({ error: err })
            });
    },
    patchProduct: (req, res) => {
        const params = req.params
        const reqBody = req.body
        if (typeof params.id == undefined //only required during query param
            || typeof reqBody == undefined
            || Object.keys(reqBody).length == 0
        ) {
            res.status(400).json({}).end()
            return
        }

        MongoDB.updateProduct(params.id, reqBody)
            .then((result) => {
                res.status(200).json(result).end()
            }).catch((err) => {
                res.status(400).json({ error: err })
            });
    },
    deleteProduct: (req, res) => {
        const paramid = req.params.id
        // delete products[idx]//adds null in the place
        MongoDB.deleteProduct(paramid)
            .then(() => {
                res.status(200).json({})
            }).catch((err) => {
                res.status(400).json({ error: err })
            });
    }
}