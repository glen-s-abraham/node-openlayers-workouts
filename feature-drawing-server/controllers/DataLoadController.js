exports.postData = (req,res,next)=>{
    console.log(req.body.geometry.type);
    console.log(req.body.geometry.coordinates);
    res.status(200).json(req.body);
}