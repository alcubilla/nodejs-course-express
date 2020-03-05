import http from  'http'; 
import express from  'express'; 
import dotenv from 'dotenv'; //usar el .env
import bodyParse from 'body-parser'; //middleware

const APP = express();

APP.use(bodyParse.urlencoded());
APP.use(bodyParse.json());  

dotenv.config();

const TotalSalas = [];
const TotalVip = [];
var Suma = 0;
var SumaVip = 0;
var asientos = 0;
var asientosVip = 0;
var asientosOcupados=[];
var asientosOcupadosVip=[];

const SERVER = http.createServer(APP);

//muetra todas las salas
APP.get('/salas' , (req,res)=>{
   const Salas= Number( process.env.Salas) ;
   const SalasVip = Number( process.env.SalasVip) ;
for (let i = 0; i < Salas ; i++) {
    TotalSalas.push({i}); 
  } 
for (let j = 0; j < SalasVip ; j++) {
    TotalVip.push({j}); 
  } 
res.send('<h2>Salas disponibles</h2>' + TotalSalas.map(f => 'Sala Normal # ' + f.i +'</br>') +  TotalVip.map(e => 'Sala Vip # ' + e.j + '</br>'));

}
  );


//compra boletos
APP.post('/shop', (req,res)=>{
 var tipo = req.body.tipo;
 var asiento = req.body.asiento;
    if (tipo =='vip'){
      if( asientosVip < process.env.MaxTicketVip){
      SumaVip += Number (process.env.CostVip);
      asientosVip += 1;
      asientosOcupadosVip.push({asiento});
      }else{ var message ="Ya no hay entradas disponibles para salas VIP"; var check=true;}
     
    }else {
      if( asientos < process.env.MaxTicket){
        Suma += Number (process.env.CostSala);
        asientos += 1;
        asientosOcupados.push({asiento});}
        else { var message ="Ya no hay entradas disponibles para salas Normales"; var check=true;}
    }
    if (check == true) {
      res.send (message);
    }else {
      res.send(`<h3>Se compro un boleto para :</h3> 
      <ul>
        <li> Tipo de Sala = ${(req.body.tipo)}</li> 
        <li>Asiento = ${(req.body.asiento)}</li>
      </ul>`);   
    }
});  


//total de ventas
APP.get('/total', (req, res)=>{ 
  res.send(`<h2>Total de ventas:</h2>
  <p>${asientosVip} asintos VIP </p>
  <p>Total: $ ${JSON.stringify(SumaVip)}</p>
    
  <p>${asientos} asientos en salas normales</p>
  <p>Total: $ ${JSON.stringify(Suma)}</p>`);  
});

//asientos ocupados
APP.get('/taken',(req,res)=>{
 res.send(`<h1>Conteo de Asientos</h1><p>Asientos ocupados VIP= ${asientosOcupadosVip.map(f => f.asiento +' ' )}</p>
  <p>Asientos ocupados Normales= ${asientosOcupados.map(f => f.asiento )}</p>`);
});

SERVER.listen(process.env.PORT);
