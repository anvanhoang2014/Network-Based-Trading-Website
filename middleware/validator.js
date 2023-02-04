const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const model = require("../models/item");

exports.validatedId = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
}

exports.findId = (req, res, next) =>{
    let id = req.params.id;
    model.findById(id)
        .then(trade=>{
            if(trade) {
                return next();
            } else {
                let err = new Error('Cannot find a trade with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err=>next(err));
}

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
    body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateResult = (req, res, next) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error =>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
};
exports.validateTrade = [body('title', 'Title cannot be empty').notEmpty().trim().escape(),
    body('category', 'Title cannot be empty').notEmpty().trim().escape(),
    body('condition', 'Title cannot be empty').notEmpty().trim().escape(),
    body('description', 'Description must be at least 20 characters').isLength({min: 20}).trim().escape(),
    body('imageURL', 'Image URL cannot be empty').notEmpty().trim(),];