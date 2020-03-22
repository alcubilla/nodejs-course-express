

export default (req, res, next) =>{
   console.log(req.path, req.currentDate);
   next();
   
 }
