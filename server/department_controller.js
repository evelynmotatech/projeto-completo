var express = require("express");
var router = express.Router();
var Department = require('./department');

//ROTA PARA SALVAR
router.post('/', (req, res)=>{
  let dep = new Department({
    name:req.body.name,
    product:req.body.product
  })

  dep.save((err, d)=>{
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(d)
    }
  })
});


//ROTA PARA LISTAR
router.get('/', (req, res)=>{
  Department.find().exec((err, deps)=>{
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).send(deps)
    }
  })
});

//ROTA PARA DELETAR
router.delete('/:id', async (req, res)=>{
  try{
    let id = req.params.id;
    await Department.deleteOne({_id: id})
    res.status(200).send({});
  }catch(err){
    res.status(500).send(err)
  }
})

//ROTA PARA EDITAR
router.patch('/:id', (req, res)=>{
  Department.findById(req.params.id, (err, dep)=>{
    if(err){
      res.status(500).send(err)
    }else if(!dep){
      res.status(404).send({})
    }else{
      dep.name = req.body.name;
      dep.product = req.body.product;
      dep.save()
        .then((d) => res.status(200).send(d))
        .catch((e)=> res.status(500).send(e))
    }   
  })
})

module.exports = router;