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
router.get("/",(req,res)=>{
    //connnect to mongodb
    mcl.connect(url,(err,conn)=>{
        if(err)
        {
             console.log("Error in Connection",err)
        }
            
        else{
            let db=conn.db('nodedb')
            db.collection('products').find().toArray((err,array)=>{
                if(err)
                    console.log('Error While fetching Data')
                else
                {
                    console.log('Data Sent')
                    res.json(array)
                }
            })
        }
    })
})
//exports router
module.exports=router