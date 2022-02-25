const express = require('express');
const StoreRouter = require('./routers/StoreRouter')
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/store",StoreRouter)

app.get("/ping",(req,res,next)=>{
    res.status(200).json({"status":"alive"})
})

module.exports=app;