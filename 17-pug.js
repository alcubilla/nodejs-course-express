import http from 'http';
import express from 'express';
import path from 'path'; //para ubicar la ruta de los archivo html
import pug from 'pug';


const APP = express();
const SERVER = http.createServer(APP);

APP.set('views', ('/views'));
APP.set('view engine','pug')

APP.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname +'/views/index2.html')); //_direname posicion actual de la ruta hasta el proyecto
    //sendFile es para enviar un archivo 
});

APP.get ('/download/:name',(req,res)=>{
    let imagen = req.params.name;
    const file = path.join (__dirname + '/images/' + imagen);
    res.download(file); //descarga el archivo
    });

APP.get ('/bajar/name',(req,res)=>{
    let imagen = req.query.name;
    console.log(imagen);
    const file = path.join (__dirname + '/images/' + imagen);
    res.download(file); //descarga el archivo
    });

SERVER.listen(4000);