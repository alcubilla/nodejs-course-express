const http = require('http'); //modulo ya en express
const express = require('express'); 
const routes = require('/routes');

const APP = express();

const SERVER =  http.createServer(APP); //le mandamos como parametro el servidor de express

const users= []; //global

routes(APP,users);




 //con los 2 puntos decimos que sera una variable accesible en el callback

SERVER.listen(4000);

