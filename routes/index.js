var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var cine=[];

router.get('/getcine',(req,res)=>{
  res.json(cine);
});

router.post('/postcine',(req,res)=>{
  let title=req.body.title;
  let id=req.body.id;
  cine.push({
    title:title,
    id:id,
    movies:[]
  });
  res.json({message:'se agrego una sala de cine'});
});


router.post('/postmovie',(req,res)=>{
  let id=req.body.id;
  let idcine=req.body.idcine;
  let title=req.body.title;
  let description=req.body.description;
  let value=req.body.value;
  let index=cine.findIndex((dat)=>{return dat.id==idcine});
  if(index==-1){
    res.json({message:'no se encontro la sala'});
  }else{
    cine[index].movies.push({
      id,
      title,
      description,
      like:value
    });
    res.json({message:'se agrego la pelicula'});
  }
});

router.get('/getaverage/:id',(req,res)=>{
  let id=req.params.id;
  let index=cine.findIndex((dat)=>{return dat.id==id});
  let sum=0;
  let prom=0;
  cine[index].movies.forEach(element => {
    sum+=parseInt(element.like);
    prom+=1;
  });
  res.json({message:(sum/prom)});
});


module.exports = router;
