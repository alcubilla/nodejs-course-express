import hasProduct from '../middlewares/hasProduct'

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
  PRODUCTS.get('/:id',hasProduct(productsList), (req,res)=>{
    res.json({status:'ok', result: req.product});
  })

  //comprar
  PRODUCTS.put('/:id',hasProduct(productsList),(req,res)=>{ 
    req.product.stock--;
    total += req.product.value;
    console.log(total)
    res.json({status:'ok', result: req.product});
    
  })

  //borrar
  PRODUCTS.delete('/:id',hasProduct(productsList),(req,res)=>{
    productsList = productsList.filter(p => p.id !== req.params.id)
    res.json({status:'ok', result: productsList});
  })
  return total
}