import http from 'http';
import express from 'express';
import path from 'path'; //para ubicar la ruta de los archivo html


const APP = express();

const SERVER = http.createServer(APP);

APP.get('/', (req,res)=>{
    res.send ('Hola');
});

APP.get('/hello',(req,res)=>{
    res.sendFile(path.join(__dirname +'/views/index.html')); //_direname posicion actual de la ruta hasta el proyecto
    //sendFile es para enviar un archivo 
});

APP.get('/gatito',(req,res)=>{
    res.sendFile(path.join(__dirname +'/images/gatito.jpg')); //_direname posicion actual de la ruta hasta el proyecto
    //sendFile es para enviar un archivo 
});

APP.get('/cookies',(req,res)=>{
   res.cookie('i-follow-you','hello', { expires: new Date(Date.now()+ 10000) }); //nombre cookie , valor, objeto con propiedades
   res.end(); //no hare nadamas
});

APP.get('/headers',(req,res)=>{ 
    res.set(
        {
            a:1,
            b: 2,
            c:3
        }
    );
    res.end();
 });

 APP.get('/redirect',(req,res)=>{ //url temporal que ya no exista o prevenir un 404
 res.redirect('/hello');
 });


 
 APP.get('/users/:id',(req,res)=>{ //404
    if (req.params.id ==  1){
        res.send('User found');
    }else {
        res.sendStatus(404);
    }
    });


APP.get ('/download',(req,res)=>{
const file = path.join (__dirname + '/images/gatito.jpg');
res.download(file); //descarga el archivo
});
   
   


SERVER.listen(3000);