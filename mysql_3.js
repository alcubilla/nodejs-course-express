import http from 'http';
import express from 'express';


const APP = express();

const SERVER = http.createServer(APP);

APP.get('/', (req,res)=>{
    res.json({ ok:1 })
})

SERVER.listen(4000);


const mysql = require('mysql');

const connection= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'products'
});
connection.connect();




connection.end();
