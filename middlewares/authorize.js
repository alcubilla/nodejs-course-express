import { validateToken } from "../hasher";

//para usar el req.token instalamos el bearerToken
export default (req, res, next) =>{
    try{ 
        if (validateToken(req.token)){
        next();  //para que no se quede trabado
    }else{
        res.sendStatus(401);
    }

    }catch(err){
        res.status(401).json({status: 'error', msg: err.message}) 
    }
   
   
 };