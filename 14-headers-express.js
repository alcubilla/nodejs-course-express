const http = require('http'); //modulo ya en express
const express = require('express'); 


const APP = express();

const SERVER = http.createServer(APP);
APP.get('/' , (req,res)=>{
    console.log (req.headers);
    res.send('end request');
});

APP.post('/' , (req,res)=>{
    console.log (req.headers);
    res.send('end request post');
});

SERVER.listen(5000);

//Headers npm install --save core-js
//@babel/core
// @babel/node
// @babel/preset-env
