const express = require('express')
const router = express.Router()

router.get('/', function(req,res){
    res.json({
        success:true,
        msg:"aqui se traeran todos los users"
    })
})

router.get('/:id', function(req,res){
    res.json({
        success:true,
        msg:`aqui se traera el users cuyo id es :${req.params.id}`
    })
})

router.post ('/',function (req,res){
    res.json({
        success:true,
        msg: `aqui se creara un user`
    })
})

router.put ('/:id',function (req,res){
    res.json({
        success:true,
        msg: `aqui se editara todos los users`
    })
})

router.delete ('/:id', function(req,res){
    res.json({
        success:true,
        msg:`aqui se eliminara el users cuyo id es :${req.params.id}`
    })
})

module.exports = router