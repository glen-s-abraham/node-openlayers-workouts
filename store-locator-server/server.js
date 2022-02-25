const mongoose=require('mongoose')
const app = require('./app')

mongoose.connect('mongodb://127.0.0.1:27017/storeData',()=>{
    console.log("DB connetced")
})

app.listen(8000,()=>{
    console.log('server started on localhost:8000')
})