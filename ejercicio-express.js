const http = require('http'); //modulo ya en express
const express = require('express'); 
const bodyParse = require('body-parser');

const APP = express();
APP.use(bodyParse.urlencoded()); //simulando que es un formulario

APP.use(bodyParse.json());  //declarar el  middleware para usarlo globalmente antes del servidor
const SERVER =  http.createServer(APP); //le mandamos como parametro el servidor de express


const products= [{
	"id": "0",
	"nombre": "Camisa",
	"precio": "300"
},
{
	"id": "1",
	"nombre": "Playera",
	"precio": "250"
},
{
	"id": "2",
	"nombre": "Falda",
	"precio": "200"
},
]; //global


//Routes
APP.get('/products/', (req,res)=>{
    if (products.length < 1)
    {res.send ('<h1>Se agotaron los productos</h1>');
    }else{ res.send (`<h1>Productos:</h1>${JSON.stringify(products)}`);}
});  

APP.get('/products/:id', (req,res)=>{
    const id = req.params.id ; 
    if(id < products.length)
    {const produtcSelected = products[id];
        res.send (`<h1>Producto seleccionado:</h1>
            <ul>
                <li> Id = ${(produtcSelected.id)}</li> 
                <li>Nombre = ${(produtcSelected.nombre)}</li>
                <li>Precio = ${(produtcSelected.precio)}</li>
            </ul>`
        );  
    }else{res.send ('<h1>No existe el producto seleccionado</h1>');}
    
});  

APP.post('/shop/:id', (req,res)=>{
    const id = req.params.id;
    const productShoping = products[id];
    products.splice(id, 1); //remplaza empezando en el indice id, removiendo 1 elemento

    if (products.length > 0){
        res.end(`<h3>El producto:</h3> 
        <ul>
            <li> Id = ${(productShoping.id)}</li> 
            <li>Nombre = ${(productShoping.nombre)}</li>
            <li>Precio = ${(productShoping.precio)}</li>
        </ul> 
        <h3>se ha sido comprado, ahora solo quedan</h3>${ JSON.stringify(products)}`);   
   }else{
    res.end('Se agotaron los productos');}
   
});  

APP.post('/put', (req,res)=>{
    const id=String ((products.length));
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    products.push({
        "id": id,
        "nombre": nombre,
        "precio": precio
    }); 
    console.log(products);
    res.end(`<h3>Se ha agregado ${ JSON.stringify(products[id])},
    Ahora los productos actualizados son:${ JSON.stringify(products)} </h3>`);    
});  

//Ruta invalida
APP.get('/*', (req,res)=>{
 res.send ('<h1>Ruta invalida</h1>')
}); 
 
SERVER.listen(5000, function(err){
    if (err){
        console.log (err);
        return;
    }
    console.log('Server listen on port 5000');
})