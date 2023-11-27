const UserModel = require ('../models/usersModels');
const express = require ('express');
const  router = express.Router();
const bcryptjs =  require('bcryptjs')

router.post ('/register', async (req, res)=>{
    try {
        const user= await UserModel.create(req.body)
        res.status(201).json(
            {
                success:true,
                data: user 
            }
        )
        
    } catch (error) {
        res.status(500)(error.code).json({
            success: false,
            error:error.message
        })
        
    }

})
router.post ('/login', async (req, res)=>{
    try{
        //separar email y password en variables
        //desestructurar
        const {email, password } = req.body

        //buscar usario 
        //con ese email
        const user = await UserModel.
                     findOne({email})
        if (!user){
            res.status(404).json(
                { success: false,
                message: 'User not found'}
            )
        }else{
            //comparar password 
            const isMatch = await user.
                compararPassword(password)
            if(isMatch){
                res.status(200).json({
                success: true,
                msg: 'Usuario logeado correctamente'
                })
            }
            else{
                res.status(401).json({
                    success: false,
                    msg: 'Credenciales invalidas'
                })
            }
        }

        console.log(user)
    } catch (error){
        res.status(500).json({
            success: false, 
            msg: error.message
        });
    }

})
module.exports = router
