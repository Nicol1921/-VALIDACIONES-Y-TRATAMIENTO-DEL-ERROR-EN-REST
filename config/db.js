const mongoose=require('mongoose')


//Funcion de conexion
const conectarDB = async ()=> {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB conectado...:'.bgCyan.red)
}

module.exports = conectarDB