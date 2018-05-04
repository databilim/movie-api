const express = require('express');
const router = express.Router();

// Model dosyasını yani databese schema sını cek

const Movie = require("../models/Movie")


/* GET users listing. */
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
