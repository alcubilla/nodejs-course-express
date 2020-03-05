const http = require('http'); //modulo ya en express
const express = require('express'); 

const APP = express();

const SERVER =  http.createServer(APP); //le mandamos como parametro el servidor de express
const users= []; //global





APP.get('/', (req, res)=>{
console.log(req.query);
res.send ('Hola');
})

APP.get('/users/:id', (req,res)=>{
    const id = req.params.id ; 
    users.push(id);  //almacena los usuarios que se van logeando
    console.log(users); // se va viendo los usuarios en el array users 
    //cacha el id con params.id de la url
    console.log(id); //lo trae como string
    res.send (`search user ${id}`);
});  //con los 2 puntos decimos que sera una variable accesible en el callback

SERVER.listen(5000);

