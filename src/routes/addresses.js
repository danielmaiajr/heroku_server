const express = require('express');
const router = express.Router();
const passport = require('passport');

const AddressController = require('../controllers/AddressController');

router.post('/addresses', passport.authenticate('jwt', { session: false }), AddressController.post);
router.get('/addresses', passport.authenticate('jwt', { session: false }), AddressController.getAll);
router.get('/addresses/:id', passport.authenticate('jwt', { session: false }), AddressController.getOne);
router.put('/addresses/:id', passport.authenticate('jwt', { session: false }), AddressController.put);
router.delete('/addresses/:id', passport.authenticate('jwt', { session: false }), AddressController.delete);

module.exports = router;
