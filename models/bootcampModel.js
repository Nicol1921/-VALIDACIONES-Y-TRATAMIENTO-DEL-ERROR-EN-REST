const mongoose = require('mongoose')

//Definir un modelo solo para Mongo
const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required : [true ,"Se requiere nombre de bootcamp" ],
        maxlength:  [20 , "El Nombre solo debe tener 20 caracteres"]
    },
    phone:{
        type: Number,
        required : [true  ,"Se requiere telefono de bootcamp" ],
        max: [ 9999999999 , "El Telefono  solo debe tener 10 caracteres"]
    },
    address:{
        type: String,
        required : [true ,"direccion requeridad" ],
    },
    topics:{
        type: [String],
        enum:["AI ",
            "BackEnd",
            "Front End",
            "Devops"]
    },
    averageRating : Number,
    createdAt:{
        type:Date,
        default :Date.now
    }
})
const Bootcamp = mongoose.model("Bootcamp",bootcampSchema)
module.exports = Bootcamp
