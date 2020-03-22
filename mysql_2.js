const mysql = require('mysql');

const connection= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'products'
});
connection.connect();


/*
 connection.query('insert into products (name, value, stock) values ("cartulina", 10, 1000)', 
 function(error, result){
     console.log(result); });
*/

  connection.query('select * from products', function(error, result){
      console.log(result);
 });



const args = process.argv;
const op= args[2] || 1;
const id = args[3] || 1;
const from = args[3] || 0;
const to = args[4] || 100;


switch(op){
    //node mysql_2.js ID 2   
    case 'ID':
        selectId(id);
        break;
    //node mysql_2.js RANGE 20 200 
    case 'RANGE':
        RangePrice(from, to);
        break;
    //node mysql_2.js DELETE 1 
    case 'DELETE':
        deleteId(id);
        break;
     default:
        console.log('No se ha indicado una operación valida');  
}



 function selectId(id){
    connection.query(`select * from products where id = ${id}`, 
    function(err, result){
        console.log('El resultado por id es :', result);
    })
 }
 
 function RangePrice(from, to){
    connection.query(`select * from products where value > ${from} and value < ${to}`, 
    function(err, result){
        console.log('El resultado del rango es :',result);
    })
 }

 function deleteId(id){
     connection.query(`delete from products where id=${id}`);
     connection.query('select * from products', 
     function(err, result){
         console.log('Despues de eliminar los productos son:',result);
     });
 }

connection.end();
