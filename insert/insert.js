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
    let obj={
        "p_id":req.body.p_id,
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
            db.collection('products').insertOne(obj,(err)=>{
                if(err)
                    res.json({'insert':'error'})
                else   
                {
                    console.log('Data Inserted')
                    res.json({'insert':'success'})
                }
                    
            })
        }
    })
})
//exports router
module.exports=router