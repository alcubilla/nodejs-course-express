import { v4 as uuidv4 } from 'uuid';

export default (ADMIN,productsList, total) => {

  //agrega un elemento
    ADMIN.post('/',(req,res)=>{
        if(req.query.name && req.query.stock && req.query.value)
        {
            let product = 
            {id: uuidv4(),
            name: req.query.name,
            stock: Number(req.query.stock),
            value: Number(req.query.value)
            }
            productsList.push(product);
            res.json(productsList);
        }else{
            res.send("No se ha podido agregar el producto, te faltó un elemento")
        }     
    });

//borrar 
  ADMIN.delete('/:id',(req,res)=>{
    const product= productsList.find(p => p.id === req.params.id);
    if(product){
    productsList = productsList.filter(p => p.id !== product.id)
    res.json({status:'ok', result: productsList});
    }else{
        res.sendStatus(404);
    }
  });

//actualizar 
  ADMIN.put('/:id',(req,res)=>{
    const product= productsList.find(p => p.id === req.params.id);
    if(product){
        product.name=req.body.name;
        product.value=req.body.value;
        product.stock=req.body.stock;
        res.json({status:'ok', result: productsList});
    }else{
        res.status(404).send("NO SE ENCONTRO EL ARTICULO A MODIFICAR");
    }
   
  });

  ADMIN.get('/shop',(req,res) =>{
      console.log(total)
    res.send(`total ${total}`);
  });

   
  }