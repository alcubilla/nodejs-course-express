import http from 'http';
import express from 'express';
import productsRoutes from './online_store/productsRoutes'
import productsList from './online_store/products'
import adminRoutes from './online_store/adminRoutes'


const APP = express();
APP.use(express.json()); //para usar el body


const PRODUCTS = express();
const ADMIN = express();

let total = 0;

APP.use('/products', PRODUCTS);
APP.use('/admin', ADMIN);

const SERVER = http.createServer(APP);

APP.get('/', (req,res) => {
    res.send('API HOME'); 
});


total = productsRoutes(PRODUCTS, productsList, total);

adminRoutes(ADMIN, productsList,total);

SERVER.listen(5000);