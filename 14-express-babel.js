import http from  'http'; //con nodemon y babel
import express from  'express'; //n y b
import dotenv from 'dotenv';

dotenv.config();

const APP = express();

const SERVER = http.createServer(APP);

APP.get('/' , (req,res)=>{
    res.send('end request on get');
});

APP.post('/' , (req,res)=>{
    console.log (req.headers);
    res.send('end request post with babel');
});

//Puerto
SERVER.listen(process.env.PORT);
    