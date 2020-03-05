import http from 'http';
import express from 'express';
import getimages from './getimages';
import path from 'path'

const APP = express();
const ImageCount=[];

APP.set('views', './views');
APP.set('view engine', 'pug');

const SERVER = http.createServer(APP);

APP.use(express.static('public')); //la carpeta public sera la ruta estatica

// APP.get('/', (req,res)=>{
//     const data= {title: "Galeria de imagenes", home:"this is home"}
//     res.render('index' ,data );
// })

APP.get('/images', (req,res)=>{
    const images= getimages();
    res.render('images',{images, title: "Image Gallery"});
})


APP.get('/download/:image', (req,res)=>{
    const file = path.join(__dirname + '/public/images/' + req.params.image);
    const name =req.params.image;


    let existe = ImageCount.filter(e => e.name == name)
    if(existe.length == 0){
        ImageCount.push({id:ImageCount.length, name, count: 1})
    }
    else{
       ImageCount[existe[0].id].count = existe[0].count +1;
    }
    console.log(ImageCount)
    res.download(file);
})

SERVER.listen(5000);