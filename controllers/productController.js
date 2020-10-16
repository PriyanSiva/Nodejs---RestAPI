const productModel = require("../models/productModel");

// @desc    GET all products
// @route   api/products
async function getProducts(req,res) {
    try {
        const products = await productModel.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc    GET Single Product
// @route   api/products/:id
async function getProduct(req,res,id) {
    try {
        const product = await productModel.findById(id);
        if(!product){
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({messge: 'Product not found'}))
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct
}