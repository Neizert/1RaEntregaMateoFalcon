const express = require('express');

const productsRouter = require('./router/productsRouter.js');
const cartsRouter = require('./router/cartsRouter.js');

const app = express();
const port = 8080;


app.use(express.urlencoded({extended:true}));

app.use('/api/products/', productsRouter);
app.use('/api/carts/', cartsRouter);

app.listen(port,() => console.log('Port 8080'))