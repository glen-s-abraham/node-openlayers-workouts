const Store = require('../models/Store')

exports.postStoreData= async (req,res,next)=>{
    const store = await Store.create(req.body)
    res.status(200).json(store)
}

exports.getAllStores=async (req,res,next)=>{
    const stores = await Store.find()
    res.status(200).json(stores)
}