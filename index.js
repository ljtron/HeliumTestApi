const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('dotenv').config()

var app = express()
app.use(morgan('combined'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.mongoDBURI);

// parse application/json
app.use(bodyParser.json())
const dataModel = require("./models/data")

app.post("/", (req,res)=>{
    console.log(req.body)
    var newDataModel = new dataModel({
        body: JSON.stringify(req.body),
        device: req.body.dev_eui,
        data: req.body.decoded.payload.data,
        date: Date.now()
    })
    newDataModel.save(function (err){
        if(err){
            res.json({error: err})
        }
        else{
            res.json({message: newDataModel})
        }
    })
})

app.get("/data/:deviceId", (req,res) =>{
    
})

app.get("/test", (req,res)=>{
    res.json("test")
})

app.post("/another", (req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

app.post("/data", (req,res) =>{
    console.log(req.body)
    res.json(req.body)
})

app.listen(8000, ()=>{
    console.log("listening on localhost:8000")
})