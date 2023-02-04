const express = require('express');
const controller = require('../controllers/offerController');
const {isLoggedIn} = require("../middleware/auth");

const router = express.Router();

router.get('/:id', isLoggedIn, controller.trade);

router.post('/:id', isLoggedIn, controller.createOffer);

router.get('/offer/:id', isLoggedIn, controller.manageOffer);

/*
router.post('/offer/:id', isLoggedIn, controller.acceptOffer);
 */


router.delete('/offer/:id', isLoggedIn, controller.delete);

module.exports = router;