const express = require('express');
const passport = require('passport');

const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

//THIS ROUTE IS USING JWT WITH LOCAL STORAGE WITH PASSPORTJS

router.post('/customers', CustomerController.create);
router.post('/customers/login', CustomerController.login);
router.get('/customers', passport.authenticate('jwt', { session: false }), CustomerController.get);
router.put('/customers', passport.authenticate('jwt', { session: false }), CustomerController.put);

module.exports = router;
