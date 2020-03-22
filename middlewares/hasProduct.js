export default (productsList) => (req, res, next) =>{
    //console.log(req.params)
    const product= productsList.find(p => p.id === req.params.id);
    if(product.stock >0 && product){
        req.product = product ;
        next();  //para que no se quede trabado y haga la ruta
    }
    else{
        res.sendStatus(404);
    }
 }