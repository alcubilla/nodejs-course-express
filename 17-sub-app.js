import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token'

import productsList from './online_store/products'
import productsRoutes from './online_store/productsRoutes'
import users from './users'
import setDate from './middlewares/setDate'
import logger from './middlewares/logger'
import { matchHash, createToken } from './hasher';

import status from './middlewares/status'
import authorize from './middlewares/authorize'

dotenv.config();

const APP = express();
const PRODUCTS = express();

let total = 0;

APP.use(bodyParser.json());
APP.use('/products', PRODUCTS);
PRODUCTS.use(bearerToken()); //si encuentra un token lo almacena en req.token
PRODUCTS.use(setDate); //use espera una funcion 
PRODUCTS.use(logger);
PRODUCTS.use(authorize);
const SERVER = http.createServer(APP);

APP.post('/login',status(users), (req,res) => {
    const {user, password} = req.body;
    if(user === req.currentUser.USER && matchHash(password, req.currentUser.PASSWORD)){
    const newToken = createToken({ user });
    res.json({status: 'ok' , result: newToken})
    }else{
        res.status(401).json({msg: "Usuario NO autorizado"});
    }
   
}); 

productsRoutes(PRODUCTS, productsList, total);

SERVER.listen(5000);