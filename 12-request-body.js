const http = require ('http');

http.createServer ((req,res)=>{
//cachamos un string de datos en body
const data=[]; //cacharemos el streem
req.on('data', (chunk)=>{
    console.log('chunk', chunk);//cada vez que obtenga un pedazo del string lo tendremos disponible
    data.push(chunk);
});
req.on ('end', ()=>{
    const body = Buffer.concat(data); //concatena los pedazos para hacerlo un conjunto y dejarlo en body
    console.log ('bufer', body);
    console.log ('result', body.toString() );
    res.end('end of request');
})
}).listen(3000);