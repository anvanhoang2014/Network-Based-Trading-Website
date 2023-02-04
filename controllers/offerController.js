const model = require('../models/user');
const item = require('../models/item');
const watch = require('../models/watch');
const offer = require('../models/offer');


exports.trade = (req, res, next)=>{
    let id = req.session.user;
    let sellerItem = req.params.id;
    Promise.all([model.findById(id), item.find({seller: id}), sellerItem, offer.find()])
        .then(results=>{
            const [user, trades, sellerItem, allOffer] = results;
            res.render('./user/trade', {user, trades, sellerItem, allOffer})
        })
        .catch(err=>next(err));
};

exports.createOffer = (req, res, next)=>{
    //res.send('Created a new trade');
    let offering = new offer(req.body); //create a new offer
    offering.buyer = req.session.user;
    offering.sellerItem =  req.params.id; //req.params.id;
    offering.status = "Offer Pending";
    offering.save()
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

    offer.findByIdAndDelete(id, {useFindAndModify: false})
        .then(offer =>{
            if(offer){
                res.redirect('/users/profile');
            } else{
                let err = new Error('Cannot find an offer transaction with the Offer ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch()

};


/*
exports.manageOffer = (req, res, next)=>{
    let offerId = req.params.id;
    offer.findById(offerId).populate('offers', 'buyerItem sellerItem')
        .then(offer=>{
            if(offer) {
                return res.render('./user/offer', {offer});
            } else {
                let err = new Error('Cannot find an offer transaction with the Offer ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err=>next(err));
};
 */

exports.manageOffer = (req, res, next)=>{
    let id = req.session.user;
    let offerId = req.params.id;

    Promise.all([item.find(), offer.findById(offerId), model.findById(id)])
        .then(results=>{
            if(results) {
                const [allItem, oneOffer, currentUser] = results;
                return res.render('./user/offer', {allItem, oneOffer, currentUser});
            } else {
                let err = new Error('Cannot find an offer transaction with the Offer ' + offerId);
                err.status = 404;
                next(err);
            }

        })
        .catch(err=>next(err));

};

/*
exports.acceptOffer = (req, res, next)=>{
    let id = req.session.user;
    let acceptedOffer = req.params.id;
    Promise.all([model.findById(id), item.find({seller: id}), watch.find({watcher: id}), item.find(), offer.find({buyer: id}), offer.find(), offer.findById(acceptedOffer)])
        .then(results=>{
            const [user, trades, watches, allItem, myOffers, allOffers, accept] = results;
            res.render('./user/profile', {user, trades, watches, allItem, myOffers, allOffers, accept});

        })
        .catch(err=>next(err));
};
 */




/*
exports.manageOffer = (req, res, next)=>{
    let offerId = req.params.id;
    Promise.all([item.find(), model.find(), offer.findById(offerId).populate('buyerItem', 'title'), offer.findById(offerId).populate('sellerItem', 'title')])
        .then(results=>{
            if(results) {
                const [allItem, allUser, buyerTrade, sellerTrade] = results;
                return res.render('./user/offer', {allItem, allUser, buyerTrade, sellerTrade});
            } else {
                let err = new Error('Cannot find an offer transaction with the Offer ' + offerId);
                err.status = 404;
                next(err);
            }

        })
        .catch(err=>next(err));

};
 */
