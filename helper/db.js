const mongoose = require("mongoose");


module.exports = ()=>{

    mongoose.connect("mongodb://movie:Cxdata66100Cx@ds161939.mlab.com:61939/movie");

    mongoose.connection.on("open",()=>{
        console.log(" MongoDB : Bağlandı ")
    })
    mongoose.connection.on("error",(err)=>{
        console.log(" MongoDB : Hata  ",err)
    })
};