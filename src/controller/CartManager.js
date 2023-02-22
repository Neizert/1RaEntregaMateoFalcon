const fs = require('fs');
const ProductManager = require('./ProductManager.js')

const productManager = new ProductManager();

class CartManager {

    constructor() {
        this.path = './data/carts.json';
    }


    async addCart(products) {

        let carts = [];

        await fs.promises.readFile(this.path, 'utf-8')
        .then((data) => carts = JSON.parse(data))
        .finally(() => {
            let cart_id = Math.floor(100000 + Math.random() * 900000);

            let cart = {
                id: cart_id,
                products: []
            }

            for  (let product of products) {
                cart.products.push(product);
            }

            carts.push(cart)

            fs.promises.writeFile(this.path, JSON.stringify(carts));
        })
 
    }

    getCartProductsById = async (id) => {

        let products = [];
        
        await fs.promises.readFile(this.path, 'utf-8')
        .then((data) => {
            let carts = JSON.parse(data)
            let cart = carts.find(selected_cart => selected_cart.id == id);
            products = cart.products
        })

        return products;
        
    }

    addProduct = async (pid, cid) => {

        await fs.promises.readFile(this.path, 'utf-8').then(
            data => {
                let carts = JSON.parse(data)
                let cart = carts.find(selected_cart => selected_cart.id == cid);
                productManager.getProductById(pid).then(product => {
                    cart.products.push(product);
                    fs.promises.writeFile(this.path, JSON.stringify(carts));
                });
            }
        )
    }

}


module.exports = CartManager;