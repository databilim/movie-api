const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
// Model dosyasını yani databese schema sını cek

const Director = require("../models/Director")


/* Direktör ekleme post */
router.post("/",(req,res)=> {

    const director = new Director(req.body);
    const promise = director.save()
    promise.then((director)=>{

        res.json({status:1})
    }).catch((err)=>{

        res.json({error:err.message="Bir Hata Oluştu", code:5})
    })
})

router.get("/",(req,res)=>{
    // join işlemi yapıyoruz
    const promise = Director.aggregate([
        {
            $lookup:{
                from:"movies",
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays : true, //  true olunca filmi olmayanlarda listelenir
            }
        },
        {

            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies',
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
});

router.get("/:director_id",(req,res)=>{
    // join işlemi yapıyoruz
    const promise = Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.objectId(req.params.director_id)
            }
        },
        {
            $lookup:{
                from:"movies",
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays : true, //  true olunca filmi olmayanlarda listelenir
            }
        },
        {

            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies',
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
});


module.exports = router;
