const mongoose = require("mongoose");


module.exports = ()=>{

    mongoose.connect("mongodb://movie:test1234@ds161939.mlab.com:61939/movie");

    mongoose.connection.on("open",()=>{
        console.log(" MongoDB : Bağlandı ")
    })
    mongoose.connection.on("error",(err)=>{
        console.log(" MongoDB : Hata  ",err)
    })

    mongoose.Promise = global.Promise;
};