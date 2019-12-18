const {Router} = require('express')
const router = Router()
const fs = require('fs')

router.get('/',(req,res,next)=>{
    fs.readFile(`${__dirname}/../utils/mocks/store.json`,(err,data)=>{
        if(err) return res.status(400).json({
            error:true,
            message:err
        })
        res.status(200).json({data:JSON.parse(data)})
        
    })
})

module.exports = { router }