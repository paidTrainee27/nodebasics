const express = require('express')
const fs = require("fs")
// const crypto = require('crypto')
const router = express.Router()

let products = []
getData((err, res) => {
    // console.log(res)
    products = JSON.parse(res)
})

function getData(callback) {
    fs.readFile("dummy.json", "utf-8", callback)
}

//GET products or get product with id
router.get('/products', (req, res) => {
    // res.status(200).send("Hello world").end()
    //url params requires url path to have mandotory params
    // params = req.params 
    //query have params as optional/?id=1
    const q = req.query
    // console.log(q)
    if (q.id) {
        //check if id is blank
        //filter() method iterates over all elements of the array and then returns a filtered array 
        //which satisfy the condition specified. while find returns the first element it FINDS that 
        //satifies the condition.
        d = products.find((item) => { return item.id == q.id });
        // console.log(d)
        if (d === null || d === undefined) {
            res.status(404).json({}).end()
            return
        }
        res.status(200).json(d).end()
        return
    }
    res.status(200).json(products).end()
})

//@POST request
router.post('/products', (req, res) => {
    const b = req.body
    if (typeof b === undefined || Object.keys(req.body).length == 0) {
        res.status(403).json({}).end()
        return
    }
    // console.log(id)
    b.id = Math.floor(Math.random() * 1000)
    products.push(b)
    res.status(200).json(b).end()
})
//@UPDATE request
router.put('/products/:id', (req, res) => {
    const b = req.body
    const params = req.params
    if (params.id == undefined || params.id == '') {//only required during query param
        res.status(401).json({}).end()
        return
    }
    if (typeof b === undefined || Object.keys(req.body).length == 0) {
        res.status(403).json({}).end()
        return
    }
    // console.log(params.id)
    const idx = products.findIndex((item, idx) => {
        if (item.id == params.id) {
            return idx
        }
        return 0
    })
    // console.log(idx)
    if (idx == 0) {
        res.status(404).json({}).end()
        return
    }
    products[idx] = b
    res.status(200).json(b).end()
})
//@PACTH request
router.patch('/products/:id', (req, res) => {
    const params = req.params
    const reqBody = req.body
    if (typeof params.id == undefined //only required during query param
        || typeof reqBody == undefined
        || Object.keys(reqBody).length == 0
    ) {
        res.status(401).json({}).end()
        return
    }
    const idx = products.findIndex((val, idx) => {
        if (val.id == params.id) {
            return idx
        }
        return 0
    })

    //check if idx is 0
    const product = products[idx]
    let obj = {
        ...product,
        ...reqBody
    }
    products[idx] = obj
    res.status(200).json(obj).end()
})
//@DELETE request
router.delete('/products/:id', (req, res) => {
    const paramid = req.params.id
    // delete products[idx]//adds null in the place
    const idx = products.findIndex((val, i) => {
        return val.id == paramid
    })
    // console.log(idx)
    products.splice(idx, 1)
    res.status(200).json(products).end()
})

exports.router = router