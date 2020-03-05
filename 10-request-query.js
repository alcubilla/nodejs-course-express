const url = require('url'); //node soporta el requiere
const http = require('http');

http.createServer((req, res)=>{
console.log(req.url, req.method);

const params = url.parse(req.url, true);
console.log (params);
res.end(JSON.stringify(params)); //conviert objeto a string
}).listen(4000);