const express = require('express');

const productsRouter = express.Router();

const ProductManager = require("../controller/productManager.js");

const productManager = new ProductManager();

productsRouter.get('/', async (req, res) => {

    let limit = req.query.limit;

    await productManager.getProducts().then(response => {
        if (limit) {
            return res.send(response.slice(0,limit));
        }
        return res.send(response);
    });
});

productsRouter.get('/:pid', async (req, res) => {

    let id = req.params.pid;

    await productManager.getProductById(id).then( response => {
        return res.send(response);
    });
});

productsRouter.post('/', async (req, res) => {

    let title = req.query.title;
    let description = req.query.description;
    let price = Number(req.query.price);
    let thumbnail = req.query.thumbnail;
    let code = req.query.code;
    let stock = Number(req.query.stock);

    await productManager.addProduct(title, description, price, thumbnail, code, stock);

});

productsRouter.put('/:pid', async (req, res) => {

    let updated_product = {};
    let product_id = req.params.pid;
    let attributes = ['title','description','price','thumbnail','code','stock']

    for (attribute of attributes) {
        if (req.query[attribute]){
            updated_product[attribute] = req.query[attribute];
        }
    }

    await productManager.updateProduct(product_id, updated_product);

});

productsRouter.delete('/:pid', async (req, res) => {

    let product_id = req.params.pid;
    await productManager.deleteProduct(product_id);

});

module.exports =  productsRouter;