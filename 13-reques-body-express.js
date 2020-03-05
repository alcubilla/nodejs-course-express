import http from  'http'; //con nodemon y babel
import express from  'express';
import bodyParse from 'body-parser';

const APP = express();
APP.use(bodyParse.urlencoded()); //simulando que es un formulario

APP.use(bodyParse.json());  //declarar el  middleware para usarlo globalmente antes del servidor

const SERVER =  http.createServer(APP); //le mandamos como parametro el servidor de express

APP.get('/', (req, res)=>{
console.log(req.body);
res.send ('Hola');

})

SERVER.listen(3000);

