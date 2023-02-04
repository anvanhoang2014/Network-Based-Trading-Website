const watch = require('../models/watch')
const model = require("../models/item");

/*
exports.watching = (req, res, next)=>{
    res.render('./watch/watching');

};
 */


exports.create = (req, res, next)=>{
    //res.send('Created a new trade');
    let watcher = new watch(req.body); //create a new trade item
    watcher.watcher = req.session.user;
    watcher.item =  req.params.id; //req.params.id;
    watcher.save()
        .then(watcher=> res.redirect('/users/profile'))
        .catch(err=>{
            if(err.name === 'ValidationError'){
                err.status = 400;
            }
            next(err);
        });

};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }
     */

    watch.findByIdAndDelete(id, {useFindAndModify: false})
        .then(watch =>{
            if(watch){
                res.redirect('/users/profile');
            } else{
                let err = new Error('Cannot find a watched item with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch()

};