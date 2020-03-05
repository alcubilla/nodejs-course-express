import http from 'http';
import express from 'express';
import path from 'path'; //para ubicar la ruta de los archivo html

const APP = express();
const SERVER = http.createServer(APP);

APP.get('/home',(req,res)=>{
    res.cookie('My cookie','', { expires: new Date(Date.now()+ 10000) }); //nombre cookie , valor, objeto con propiedades
   
    res.sendFile(path.join(__dirname +'/views/index2.html')); //_direname posicion actual de la ruta hasta el proyecto
    //sendFile es para enviar un archivo 
});

APP.get ('/download/:name',(req,res)=>{
    let imagen = req.params.name;
    if (req.params.name == 0){
        res.cookie('Usuario', 'restringido', { maxAge: 9000})
        res.status(500).send('Algo salio mal...UPS!'); //Internal server error
        
    }else {
        const file = path.join (__dirname + '/images/' + imagen);
        res.cookie('Usuario', 'permitido')
        res.download(file); //descarga el archivo
    }
   
    });

APP.get ('/bajar/',(req,res)=>{
    let imagen = req.query.name;
    console.log(imagen);
    const file = path.join (__dirname + '/images/' + imagen);
    res.download(file); //descarga el archivo
    });

APP.get('/status',(req, res) =>{
 res.status(500)
});

SERVER.listen(4000);