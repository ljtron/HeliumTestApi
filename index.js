const express = require("express")
var morgan = require('morgan')
var bodyParser = require('body-parser')

var app = express()
app.use(morgan('combined'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post("/", (req,res)=>{
    console.log(req.body)
    res.json(req.body)
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