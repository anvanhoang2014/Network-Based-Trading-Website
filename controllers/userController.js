const model = require('../models/user');
const item = require('../models/item');
const watch = require('../models/watch');
const offer = require('../models/offer');

exports.new = (req, res)=>{
    return res.render('./user/new');
};

exports.create = (req, res, next)=>{
    //res.send('Created a new user');
    let user = new model(req.body);//create a new user document
    if(user.email)
        user.email = user.email.toLowerCase();
    user.save()//insert the document to the database
        .then(user=> res.redirect('/users/login'))
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);
                return res.redirect('/users/new');
            }

            if(err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('/users/new');
            }

            next(err);
        });
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    if(email)
        email = email.toLowerCase();
    let password = req.body.password;
    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('Wrong email address');
                req.flash('error', 'Wrong email address');
                res.redirect('/users/login');
            } else {
                user.comparePassword(password)
                    .then(result=>{
                        if(result) {
                            req.session.user = user._id;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/users/profile');
                        } else {
                            req.flash('error', 'Wrong password');
                            res.redirect('/users/login');
                        }
                    });
            }
        })
        .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    let acceptedOffer = req.params.id;
    Promise.all([model.findById(id), item.find({seller: id}), watch.find({watcher: id}), item.find(), offer.find({buyer: id}), offer.find(), offer.findById(acceptedOffer)])
        .then(results=>{
            const [user, trades, watches, allItem, myOffers, allOffers, traded] = results;
            res.render('./user/profile', {user, trades, watches, allItem, myOffers, allOffers, traded});
        })
        .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err)
            return next(err);
        else
            res.redirect('/');
    });

};

exports.updateStatus = (req, res, next)=>{
    let id = req.params.id;
    offer.findByIdAndUpdate(id, {status: 'Traded'}, {useFindAndModify: false, runValidators: true})
        .then(theOffer=>{
            if(theOffer){
                res.redirect('/users/profile');
            } else{
                let err = new Error('Cannot find an offer transaction with offer id ' + id);
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
exports.trade = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), item.find({seller: id})])
        .then(results=>{
            const [user, trades] = results;
            res.render('./user/trade', {user, trades})
        })
        .catch(err=>next(err));
};
 */

