const express = require('express');
const router = express.Router();

// Model dosyasını yani databese schema sını cek

const Movie = require("../models/Movie")


/*  */


/* GET  */

router.get("/",(req,res)=>{

 const  promise = Movie.find({ })
    promise.then((data)=>{

      res.json(data)


    }).catch((err)=>{

      res.json(err)

    })
});

/*  Guncelleme ıd ye göre   */
router.put("/:movie_id",(req,res,next)=>{

    const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body)

    promise.then((data)=>{
        //if(!data)
        // next({message:"Dosya Eklemede sorun ile karşılaştı"})
     res.json(data)

    }).catch((err)=>{

        res.json({error:{message:err.message ="Bir hata oluştu ",code:02 }})
    })

})

// Tek ürün listelemek
router.get("/:movie_id",(req,res,next)=>{

  const promise = Movie.findById(req.params.movie_id)

    promise.then((data)=>{

      res.json(data)

    }).catch((err)=>{

      res.json({error:{message:err.message ="Bir hata oluştu ",code:01 }})
    })

})

/* POST . */
router.post('/', (req, res, next)=> {
  const {title,country,imdb_score,category, year} = req.body;
  const movie =  new Movie(req.body)

    const promise = movie.save();
  promise.then((data)=>{
    res.json({status:1})
  }).catch((err)=>{
    res.json(err)
  })


    /*
    movie.save((err,data)=>{
      if(err)
        res.send(err)

        res.json({status:1});

    })

    */



});

module.exports = router;
