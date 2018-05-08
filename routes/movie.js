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

    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
          new : true
        }

    );

    promise.then((data)=>{
        //if(!data)
        // next({message:"Dosya Eklemede sorun ile karşılaştı"})
     res.json({status:1})

    }).catch((err)=>{

        res.json({error:{message:err.message ="Bir hata oluştu ",code:2 }})
    })

})


// TOP 10 listesi
router.get("/top10",(req,res,next)=>{

    const promise = Movie.find({}).limit(10).sort({imdb_score:-1}) // buyükten küçüğe

    promise.then((data)=>{

        res.json(data)

    }).catch((err)=>{

        res.json({error:{message:err.message ="Bir hata oluştu ",code:1 }})
    })

})


// Tek ürün listelemek
router.get("/:movie_id",(req,res,next)=>{

  const promise = Movie.findById(req.params.movie_id)

    promise.then((data)=>{

      res.json(data)

    }).catch((err)=>{

      res.json({error:{message:err.message ="Bir hata oluştu ",code:1 }})
    })

})

// Belirli tarihler arası ürün listelemek
router.get("/between/:start_year/:end_year",(req,res,next)=>{
    const { start_year,end_year } = req.params
    const promise = Movie.find(
        {
          ﻿year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}
        }
        )

    promise.then((data)=>{

        res.json(data)

    }).catch((err)=>{

        res.json({error:{message:err.message ="Bir hata oluştu ",code:1 }})
    })

})

router.delete("/:movie_id",(req,res,next)=>{

    const promise = Movie.findByIdAndRemove(req.params.movie_id)

    promise.then((data)=>{

        res.json({status:1})

    }).catch((err)=>{

        res.json({error:{message:err.message ="Bir hata oluştu ",code:3 }})
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
    res.json({error:{message:err.message ="Bir hata oluştu ",code:4 }})
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
