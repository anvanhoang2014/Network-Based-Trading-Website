const model = require('../models/item');
const watch = require('../models/watch');
const user = require('../models/user');

exports.trades = (req, res, next)=>{
    //res.send('send all trades');
    model.find()
        .then(trades=>res.render('./trade/trades', {trades}))
        .catch(err=>next(err));
};

/*
exports.trades = (req, res)=>{
    let items = model.find();
    res.render('./trade/trades', {items});
};

 */



exports.newTrade = (req, res)=>{
    res.render('./trade/newTrade');
};


exports.create = (req, res, next)=>{
    //res.send('Created a new trade');
    let trade = new model(req.body); //create a new trade item
    trade.seller = req.session.user;
    trade.status = "Available";
    trade.save()
        .then(trade=> res.redirect('/trading/'))
        .catch(err=>{
            if(err.name === 'ValidationError'){
                err.status = 400;
            }
            next(err);
        });

};

/*
exports.create = (req, res)=>{
    let tradeItem = req.body;
    model.save(tradeItem);
    res.redirect('/trading');
};
 */

exports.trade = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }
     */

    /*
    model.findById(id).populate('seller', 'firstName lastName')
        .then(trade=>{
            if(trade) {
                return res.render('./trade/trade', {trade});
            } else {
                let err = new Error('Cannot find a trade with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err=>next(err));
     */


    let watchId = req.session.user;
    Promise.all([model.findById(id).populate('seller', 'firstName lastName'), model.findById(id), watch.find({item: id, watcher: watchId})])
        .then(results=>{
            if(results){
                const [author, trade, watches] = results;
                if(trade){
                    res.render('./trade/trade', {author, trade, watches})
                } else {
                    let err = new Error('Cannot find a trade with id ' + id);
                    err.status = 404;
                    next(err);
                }

            }

        })
        .catch(err=>next(err));




};

/*
exports.trade = (req, res, next)=>{
    let id = req.params.id;
    let tradeItem = model.findById(id);
    if(tradeItem)   {
        res.render('./trade/trade', {tradeItem})
    } else {
        let err = new Error('Cannot find a item with id ' + id);
        err.status = 404;
        next(err);
    }


};
 */


exports.edit = (req, res, next)=>{
    let id = req.params.id;
    /*
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }
     */
    model.findById(id).populate('seller', 'firstName lastName')
        .then(trade=>{
            if(trade) {
                return res.render('./trade/edit', {trade});
            } else {
                let err = new Error('Cannot find a trade with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err=>next(err));

};





/*
exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let tradeItem = model.findById(id);
    if(tradeItem) {
        res.render('./trade/edit', {tradeItem})
    } else {
        //res.status(404).send('Cannot find item with this id ' + id));
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);
    }
};
 */

exports.update = (req, res, next)=>{
    let trade = req.body;
    let id = req.params.id;

    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }
     */

    model.findByIdAndUpdate(id, trade, {useFindAndModify: false, runValidators: true})
        .then(trade=>{
            if(trade){
                res.redirect('/trading/'+id);
            } else{
                let err = new Error('Cannot find a trade with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err=>{
            if(err.name === 'ValidationError')
                err.status = 404;
            next(err)
        });
};

/*
exports.update = (req, res, next)=>{
    let tradeItem = req.body;
    let id = req.params.id;
    if (model.updateById(id, tradeItem)) {
        res.redirect('/trading/'+id);
    } else {
        //res.status(404).send('Cannot find item with this id ' + id);
        let err = new Error('Cannot find an item with id ' + id);
        err.status = 404;
        next(err);
    }

};
 */

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid trade ID');
        err.status = 400;
        return next(err);
    }
     */

    model.findByIdAndDelete(id, {useFindAndModify: false})
        .then(trade =>{
            if(trade){
                res.redirect('/trading');
            } else{
                let err = new Error('Cannot find a trade with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch()

};

/*
exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/trading');
    }
    else {
        //res.status(404).send('Cannot find item with this id ' + id);
        let err = new Error('Cannot find a item with id ' + id);
        err.status = 404;
        next(err);
    }
};
 */

