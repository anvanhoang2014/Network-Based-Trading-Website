const express = require('express');
const controller = require('../controllers/tradeController');
const {isLoggedIn, isSeller} = require('../middleware/auth');
const {validatedId, findId, validateTrade, validateResult} = require('../middleware/validator');

const router = express.Router();


//GET /trading: send all trade items to the user

router.get('/', controller.trades);

//GET /trading/new: send html form for creating a new trade item

router.get('/new', isLoggedIn, controller.newTrade);

//POST /trading: create a new trade item

router.post('/', isLoggedIn, validateTrade, validateResult, controller.create);

//GET /trading/:id: send details of a trade item identified by id

router.get('/:id', validatedId, controller.trade);

//GET /trading/:id/edit: send html form for editing an existing trade item

router.get('/:id/edit', isLoggedIn, validatedId, findId, isSeller, controller.edit);

//PUT /trading/:id: update the trade item identified by id

router.put('/:id', isLoggedIn, validatedId, findId, isSeller, validateTrade, validateResult, controller.update);

//DELETE /trading:id: delete the trade item identified by id

router.delete('/:id', isLoggedIn, validatedId, findId, isSeller,controller.delete);

module.exports = router;