const fs = require('fs');

class ProductManager {

    constructor() {
        this.path = './data/products.json';
    }


    getProducts = async () => {
        let products;

        await fs.promises.readFile(this.path, 'utf-8')
        .then((data) => products = JSON.parse(data))
        .catch(() => products = []);


        return products;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (arguments.length != 6) {
            return console.error('Invalid number of parameters');
        }
        for (let argument of arguments){
            if (!argument){
                return console.error('Missing required parameter');
            }
        }
        await this.getProducts().then((products) => {
            for (let product of products) {
                if (product.code == code) {
                    return console.error('Product code is already in use');
                }
            }

            let id_value = 1;

            if (products.length > 0) {
                id_value = (Math.max(...products.map(o => o.id))) + 1;
            }


            let product = {
                id: id_value,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
            products.push(product);
            fs.promises.writeFile(this.path, [JSON.stringify(products)]);
        })
        .catch((error) => console.error(error));
        
    }

    getProductById = async (id) => {
        return await this.getProducts().then((products) => {
            for (let product of products) {
                if (product.id == id) {
                    return product;
                }
            }
        return {'error': 'Product not found'};
        })
        
        
    }

    updateProduct = async (id, new_val) => {

        if (new_val.hasOwnProperty('id')){
            console.error('ID can not be modified');
            return;
        }

        await this.getProducts().then((products) => {

            let outdated_product = products.find(product => product.id == id);

            Object.assign(outdated_product, new_val)

            fs.promises.writeFile(this.path, [JSON.stringify(products)]);
        })
    }

    deleteProduct = async (id) => {

        await this.getProductById(id).then((target_product) => {
            this.getProducts().then((products) => {
                products.map((product) => {
                    if (product.id == target_product.id) {
                        products.splice(products.indexOf(product),1);
                        fs.promises.writeFile(this.path, [JSON.stringify(products)]);
                    }
                })
            })
        })
    }

}


module.exports = ProductManager;