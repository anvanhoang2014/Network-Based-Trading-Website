const express = require('express');
const controller = require('../controllers/watchController');
const {isLoggedIn} = require('../middleware/auth');


const router = express.Router();

//router.get('/watching', isLoggedIn, controller.watching);

router.post('/watching/:id', isLoggedIn, controller.create);

router.delete('/watching/:id', isLoggedIn, controller.delete);

module.exports = router;