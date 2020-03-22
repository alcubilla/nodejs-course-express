const mysql = require('mysql');

//conectarnos
const connection= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'course_test3'
});

//iniciarla conexion a la bd
connection.connect();



// connection.query('select 1 + 1 as solution',
// function(error, result) {
//     if (error){
//         console.log(error.message)
//     }else{
//         console.log('Result is ', result[0].solution)

//     }
// });

 const name = 'juan';
 const status = 1;
// connection.query(`insert into users (name, status) values (?, ?)` , [name,status], 
// function(error, result){
//     console.log(result);
// });

// connection.query('insert into users (name, status) values ("fer", 2 )', function(error, result){
//     console.log(result);
//  });

 connection.query('select * from users', function(error, result){
     console.log(result);
 });

// connection.query('update users set name="waldo", status =3 where id= 2', function(err,result){
//     console.log(result);
// });

// connection.query('delete from users where id= 3', function(err, result){
//     console.log(result);
// });

// connection.query('select * from users where status = 2', function(error, result){
//     console.log(result);
// });

// connection.query('select * from users where status < 2', function(error, result){
//     console.log(result);
// });



connection.end();

