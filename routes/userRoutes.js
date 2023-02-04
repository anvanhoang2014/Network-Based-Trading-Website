const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn, isSeller} = require('../middleware/auth');
const {logInLimiter} = require('../middleware/rateLimiters');
const {validateSignUp, validateLogIn, validateResult, validatedId, findId} = require("../middleware/validator");

const router = express.Router();

//GET /users/new: send html form for creating a new user account

router.get('/new', isGuest, controller.new);

//POST /users: create a new user account

router.post('/', isGuest, validateSignUp, validateResult, controller.create);

//GET /users/login: send html for logging in
router.get('/login', isGuest, controller.getUserLogin);

//POST /users/login: authenticate user's login
router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.login);

router.post('/profile', isLoggedIn, controller.profile);

//GET /users/profile: send user's profile page
router.get('/profile', isLoggedIn, controller.profile);

//POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout);

router.post('/trade/offer/:id', isLoggedIn, controller.profile);

router.put('/trade/offer/:id', isLoggedIn,  controller.updateStatus);


/*
router.get('/trade/:id', isLoggedIn, controller.trade);

router.post('/trade/:id', isLoggedIn, controller.createOffer);
 */


module.exports = router;