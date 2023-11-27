const express = require('express')
const bootcampModel = require("../models/bootcampModel")
const mongoose = require('mongoose')
const Bootcamp = require('../models/bootcampModel')
const router = express.Router()


router.get('/', async (req,res) => {
    //traigo todos los bootcamps
    try {
        const bootcamps = await bootcampModel.find()
        if (bootcamps.length === 0){
            res.
                status(400).
                json({
                    success:false,
                    msg : 'No hay bootcamps'
            })
        }else{
            res.
            status(200).
            json({
                success:true,
                data: bootcamps
            })
        }
    } catch (error) {
        res.
            status(500).
            json({
                success:false,
                msg : `Error interno del servido ${error.message}`
            })
    }

})


router.get('/:id', async (req,res) => {
    //Traer bootcamp por id: 
    try {
        // vallidar id para mongo
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.
                status(400).
                json ({
                    success:false,
                    msg : `id Invalido`
            })
        }else{
            //Traer bootcamp por id
            const bootcamp = await bootcampModel.findById(req.params.id)
            if (!bootcamp) {
                // si no existe el bootcamp
                res.
                    status(400).
                    json ({
                        success:false,
                        msg : `No Existe el bootcamp${req.params.id}`
                })
            } else {
                // si existe el bootcamp
                res.status(200).
                json({
                    success:true,
                    data: bootcamp
                })
            }
      }

    } catch (error) {
        res.
            status(500).
            json({
                success:false,
                msg : `Error interno del servido ${error.message}`
            })
    }
    
})

router.post ('/', async (req,res)=>{
    // Registar nuevo Bootcamp
    try {
        const newBootcamp = await bootcampModel.create(req.body)
        res.status(201).json({
            success:true,
            data: newBootcamp
        })

    } catch (error) {
        res.
            status(500).
            json({
                success:false,
                msg : `Error interno del servido ${error.message}`
            })
    }
    
    
})


router.put ('/:id', async(req,res)=>{
    try { 
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.
                status(400).
                json ({
                    success:false,
                    msg : `id Invalido`
            })
        }else{
            const updateBootcamp = await bootcampModel.findByIdAndUpdate(req.params.id,req.body,{new:true })
            if(!updateBootcamp){
                //No existe el Bootcamp
                res.
                status(400).
                json ({
                    success:false,
                    msg : `No Existe el bootcamp ${req.params.id}`
            })
            }else{
                // Si existe Bootcamp
                res.status(200).
                json({
                    success:true,
                    data: updateBootcamp
                })

            }
        }

    } catch (error) {
        res.
        status(500).
        json({
            success:false,
            msg : `Error interno del servido ${error.message}`
        })
    }
    
})



router.delete ('/:id', async(req,res)=>{
    try { 
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.
                status(400).
                json ({
                    success:false,
                    msg : `id Invalido`
            })
        }else{
            const deleteBootcamp= await bootcampModel.findByIdAndDelete(req.params.id,req.body,{new:true })
            if(!deleteBootcamp){
                //No existe el Bootcamp
                res.
                status(400).
                json ({
                    success:false,
                    msg : `No Existe el bootcamp ${req.params.id}`
            })
            }else{
                // Si existe Bootcamp
                res.status(200).
                json({
                    success:true,
                    data: deleteBootcamp
                })

            }
        }

    } catch (error) {
        res.
        status(500).
        json({
            success:false,
            msg : `Error interno del servido ${error.message}`
        })
    }
})

module.exports = router