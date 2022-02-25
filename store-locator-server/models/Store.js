const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
    name:String,
    owner:String,
    contact:String,
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], 
            required: true
        }
    }
})

const Store = mongoose.model('Store',StoreSchema);
module.exports = Store;