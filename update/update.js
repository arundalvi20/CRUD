//import modules
const { Router } = require('express')
const express=require('express')
let mongodb=require('mongodb')
//import url
let url=require('../url')
//create mongoclient
let mcl=mongodb.MongoClient
//create router instance
let router=express.Router()
//create Rest api
router.post("/",(req,res)=>{
    let p_id=req.body.p_id
    let obj={
       
        "p_cost":req.body.p_cost,
        "p_name":req.body.p_name
    }
    //connect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in Connection',err)
        else
        {
            let db=conn.db('nodedb')
            db.collection('products').updateOne({p_id:p_id},{$set:obj},(err)=>{
                if(err)
                    res.json({'update':'error'})
                else   
                {
                    console.log('Data Updated')
                    res.json({'update':'success'})
                }
                    
            })
        }
    })
})
//exports router
module.exports=router