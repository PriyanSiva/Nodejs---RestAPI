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

// @desc    POST a product
// @route   api/products
async function createProduct(req,res) {
    try {
        let body ='';
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async () => {
            const { name, description } = JSON.parse(body)
            
            const product = {
                name,
                description
            }

            const newProduct = await productModel.create(product);
            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newProduct))
        }) 
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
}