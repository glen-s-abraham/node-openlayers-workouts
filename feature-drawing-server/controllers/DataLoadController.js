const Feature = require('../model/Feature');

exports.postData = async (req,res,next)=>{
    const feature = await Feature.create(req.body);
    res.status(200).json(feature);
}

exports.getData = async (req,res,next)=>{
    const features = await Feature.find();
    res.status(200).json(features);
}

exports.updateData=(req,res,next)=>{
    console.log(req.body);
    return res.status(200).json({"status":"success"});
}