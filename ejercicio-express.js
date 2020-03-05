const http = require('http'); //modulo ya en express
const express = require('express'); 
const bodyParse = require('body-parser');

const APP = express();

APP.use(bodyParse.urlencoded()); //simulando que es un formulario
APP.use(bodyParse.json());  //declarar el  middleware para usarlo globalmente antes del servidor

const SERVER =  http.createServer(APP); //le mandamos como parametro el servidor de express


var products= [{
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
var indice =2;


//Routes

//Todos los productos
APP.get('/products/', (req,res)=>{
    if (products.length < 1)
    {res.send ('<h1>Se agotaron los productos</h1>');
    }else{ 
        res.send (`<h1>Catálogo de Productos:</h1>
        <ul> ${ products.map( e => ' <li> Id: ' + e.id + '</br> Nombre: '+ e.nombre + '</br> Precio: ' + e.precio + '</li>')}</ul>`);
        }
    } );

//Por id
APP.get('/products/:id', (req,res)=>{
    var copy = products;
    const result = copy.filter(c => c.id == String(req.params.id));

    if(result.length == 0) {
        res.send('<h1>No existe el producto seleccionado</h1>');
    }else
    {res.send(`<h3>Usted ha seleccionado el producto:</h3> 
        <ul>
            <li> Id = ${JSON.stringify(result[0].id)}</li> 
            <li>Nombre = ${JSON.stringify(result[0].nombre)}</li>
            <li>Precio = ${JSON.stringify(result[0].precio)}</li>
        </ul>`);
    }
});  

//Borrar uno
APP.post('/shop/:id', (req,res)=>{
    const id = String(req.params.id);
    var buy = products.filter(c => c.id == id);
    products = products.filter(c => c.id !== id);
    if (products.length== 0)
    {var message = "Se agotaron todos los productos, regrese más tarde";}
    else{ var message = "Puede seguir comprando en nuestro catálogo";}
    if(buy.length == 0) {
        res.send('<h1>No existe el producto seleccionado o ya se agotó</h1>');
    }else { 
         res.send(`<h3>Usted compró el producto:</h3> 
            <ul>
                <li> Id = ${(buy[0].id)}</li> 
                <li>Nombre = ${(buy[0].nombre)}</li>
                <li>Precio = ${(buy[0].precio)}</li>
            </ul><h3> ${message}</h3> `);
        } 
});  


//Añadir uno
APP.post('/put', (req,res)=>{
     indice ++;
    var id=String(indice);
    const nombre = req.body.nombre;
    const precio = req.body.precio;

    products.push({
        "id": id,
        "nombre": nombre,
        "precio": precio
    }); 
    var ultimo = products[products.length - 1];

res.send(`<h3>Se ha agregado ${JSON.stringify(ultimo)},
    Ahora los productos actualizados son:${ JSON.stringify(products)} </h3>`);    
});  

//Ruta invalida
APP.get('/*', (req,res)=>{
 res.send ('<h1>Ruta invalida</h1>')
}); 
 

//Puerto
SERVER.listen(5000, function(err){
    if (err){
        console.log (err);
        return;
    }
    console.log('Server listen on port 5000');
})