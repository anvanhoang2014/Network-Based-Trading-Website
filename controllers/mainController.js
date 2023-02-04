const model = require("../models/item");

exports.about = (req, res)=>{
    res.render('./trade/about');
};

exports.contact = (req, res)=>{
    res.render('./trade/contact');
};