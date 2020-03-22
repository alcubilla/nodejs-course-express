import mysql from 'mysql';

const connection= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'products'
});
connection.connect();


export default connection;
