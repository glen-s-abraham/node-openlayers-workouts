const express = require('express');
const cors = require('cors');
const app = new express();

app.use(cors());
app.use(express.json());

app.post("/api/uploadShape",(req,res)=>{
    console.log(req.body.geometry.type);
    console.log(req.body.geometry.coordinates);
    res.status(200).json(req.body);
})

app.get("/api/ping",(req,res)=>{
    res.status(200).json({"state":"live"});
})
module.exports = app;