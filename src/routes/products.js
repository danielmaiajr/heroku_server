const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/products', ProductController.getAll);
router.get('/products/search', ProductController.getSearch);
router.get('/products/:section', ProductController.getSection);

module.exports = router;
