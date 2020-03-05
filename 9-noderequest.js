var http = require ('http'); //modulo http para crear un servidor web o http
//http.cresteServer es para llamar su metodo para crear el servidor

const server = http.createServer((req,res)=>{//funcion que envia una respuesta
    
    res.end('Hello world');

});
server.listen (3000, ()=> {console.log ('server listen in port 30000');
});