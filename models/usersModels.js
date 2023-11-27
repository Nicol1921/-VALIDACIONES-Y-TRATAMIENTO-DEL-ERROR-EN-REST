const moogose = require ('mongoose')
const bcryptjs =  require('bcryptjs')

const userSchema = new moogose.Schema({
    name: String,
    email: String,
    password: String,
    role:String

})

userSchema.pre('save' , async function (next){
    //Generar la sal para password
    const sal = await bcryptjs.genSalt(10)
    //Crear la clave encriptada con la sal
    //Y asignarla al password de 
    //La entidad 
    this.password = await bcryptjs.hash(this.password , 
        sal )

})

userSchema.
    methods.
        compararPassword = async function(password){
   return bcryptjs.
        compare(password, this.password)
}

module.exports = moogose.model('User', userSchema)