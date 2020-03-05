function log(){
    console.log ('operacion');
    setTimeout(log, 3000);
}

setTimeout(log, 3000);