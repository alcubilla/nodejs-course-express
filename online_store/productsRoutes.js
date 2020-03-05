export default (PRODUCTS,productsList, total) => {

  //mostrar  
  PRODUCTS.get ('/', (req, res) => {
      const viewActive = Number(req.query.status) === 1;
      const activeProducts = viewActive
      ? productsList.filter(p => p.stock > 0)
      : productsList; //solo los productos existentes
      res.send({status:'ok', result: activeProducts});
  });

  //mostrar por id
  PRODUCTS.get('/:id',(req,res)=>{
    const product= productsList.find(p => p.id === req.params.id);
    if(product){
    res.json({status:'ok', result: product});
    }else{
        res.sendStatus(404);
    }
   
  })

  //comprar
  PRODUCTS.put('/:id',(req,res)=>{
    const product= productsList.find(p => p.id === req.params.id);
    if(product.stock >0 && product){
    product.stock--;
    total += product.value;
    console.log(total)
    res.json({status:'ok', result: product});
     
    }else{
      res.sendStatus(404);
    }
   
  })

  //borrar
  PRODUCTS.delete('/:id',(req,res)=>{
    const product= productsList.find(p => p.id === req.params.id);
    if(product){
    productsList = productsList.filter(p => p.id !== req.params.id)
    res.json({status:'ok', result: productsList});
    }else{
        res.sendStatus(404);
    }
   
  })
  return total
}