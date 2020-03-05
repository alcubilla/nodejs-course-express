

var express = require('express');  //requerir el modulo de express que ya tiene el modulo http

var APP = express(); //ejecuto el modulo express y devuelve un objeto en APP  que en realidad es el servidor


//pedir cosas al servidor para mostrar con metiodo get
//post el navegador envia datos al servidor para almacenarlos
//put actualizar navegador con el Frontend
//delete ...elimine datos dentro del servidor
function logger (req, res, next) {
    console.log (`Ruta recibida: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

APP.use(express.json());
APP.use(logger);

APP.all('/users', (req, res, next)=>{
    console.log('Por aqui paso');
   
    next();
} ); //funcion de express que para cualquier ruta hara esto antes de llegar a las rutas


APP.get('/users', (req, res) =>{
    res.json ({
        username: 'Marina', 
        lastname : 'Alcubilla'
    });
   
});

//eviar info como enviar un formulario
APP.post('/users/:id', (req, res)=>{
    console.log (req.body); //cuerpo de la peticion . tomar la info que esta enviando
    console.log (req.params); //parametro de la peticion
    res.send('Peticion post recibida');
    });

APP.put('/users/:id', (req, res) =>{
    console.log(req.body);
    console.log (req.params.id);
    res.send(`Usuario ${req.params.id} esta actualizado`);
     });


APP.delete('/users/:id', (req, res) =>{ //id es el parametro
    res.send(`Usuario ${req.params.id} ha sido eliminado`);
    });




APP.listen(5000, function(err){
    if (err){
        console.log (err);
        return;
    }
    console.log('Server listen on port 5000');
})