const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { exec } = require("child_process");
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
    //console.log(req.body)
    if(req.body.decoded.payload.data.substring(0, 2) != 00 && req.body.decoded.payload.data.length >= 6){
        exec("python3 ../mqps/config_decoder.py -p " + req.body.decoded.payload.data, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            const pattern = /\[(.*?)\]/gi;
            stdout = stdout.replace(/(\r\n|\n|\r)/gm, "");
            stdout = stdout.match(pattern)
            stdout = stdout.toString()
            stdout = stdout.split(" ").join("")
            //console.log(`stdout: \n${stdout.match(pattern)}`);
            
            var newDataModel = new dataModel({
                body: JSON.stringify(req.body),
                device: req.body.dev_eui,
                data: stdout.toString(),//req.body.decoded.payload.data,
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
            console.log(`stdout: \n${stdout}`);
        });
    }
    else{
        res.json("not result")
    }
})

app.get("/data/:deviceId", (req,res) => {

    if(req.query.date == undefined || req.query.date == ""){
        res.json({error: "You need a date"})
    }
    else if(req.params.deviceId == undefined || req.params.deviceId == ""){
        res.json({error: "You need a device Id"})
    }
    else{
        dataModel.find({device: req.params.deviceId, date: {$gte: new Date(req.query.date)}}, (err, doc) => {
            if(err){
                res.json({error: err})
            }
            else{
                res.json({message: doc})
            }
        })
    }
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