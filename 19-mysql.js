import http from 'http';
import express from 'express';
import connection from './connection';
import bodyParser from 'body-parser';



const APP = express();
APP.use(bodyParser.json());


const SERVER = http.createServer(APP);


//http://localhost:4000/?status=0
APP.get('/', (req,res)=>{ 
    const status = req.query.status;
    const query = status
    ? `select * from products where status = ${status} `
    : 'select * from products'
    connection.query(query, (error, result)=>{
        if(error){res.json({status: 'error', msg: err.message})}
        res.json({status: 'ok', result});
    });   
});

APP.get('/products/:id', (req, res)=>{
    connection.query('select * from products where id =?',[req.params.id], (error, result)=>{
        if(error){res.json({status: 'error', msg: err.message})}
        res.json({status: 'ok', result});
    });
});

APP.delete('/products/:id', (req,res)=>{
    connection.query('delete from products where id = ?',[req.params.id], (error, result)=>{
        if(error){res.json({status: 'error', msg: err.message})}
        res.json({status: 'ok', result});
    });
});

APP.post('/products', (req,res)=>{
    const {name,value,stock,status} = req.body;
    connection.query('insert into products (name, value, stock, status) values (?, ?, ?, ?)',[name,value,stock,status], (error, result)=>{
        if(error){res.json({status: 'error', msg: err.message})}
        res.json({status: 'ok', result: result.insertId});
    });
});

APP.put('/products/:id',(req,res)=>{
    const {name,value,stock,status} = req.body;
    connection.query('update products set name= ?, value= ?, stock= ?, status= ? where id = ?', [name, value, stock, status, req.params.id], 
    (err,result)=>{
        if(err){res.json({status: 'error', msg: err.message})}
        res.json({status: 'ok', result});
    });
});

//actualizar stock por id
APP.put('/stock/:id',(req,res)=>{
    connection.query('update products set stock= ? where id = ?', [req.body.stock, req.params.id], 
    (err,result)=>{
        if(err){res.json({status: 'error', msg: err.message})}
        res.json({status: 'ok', result});
    });
});

//comprar por id solo si hay en stock y está activo
APP.put('/buy/:id',(req,res)=>{
    connection.query('update products set stock = stock-1 where id = ? and status = 1 and stock > 0', [req.params.id], 
    (err,result)=>{
        if(result.affectedRows > 0 ){
            connection.query('select id from ventas where productId= ?',[req.params.id],(error,results)=>{
                if(results.length > 0)
                {connection.query('update ventas set total=total+1 where productId = ?',[req.params.id])}
                else{connection.query('insert into ventas (productId, total) values (?, 1)',[req.params.id])}
            });
        }
    if(err){res.json({status: 'error', msg: err.message})}
    res.json({status: 'ok', result});
    });
 });

 //ver ventas
 APP.get('/buy',(req,res)=>{
    connection.query('select * from ventas', (err, result)=>{
    if(err){res.json({status: 'error', msg: err.message})}
    res.json({status: 'ok', result})
    });
});



SERVER.listen(4000);

