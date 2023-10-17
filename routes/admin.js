const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin')


// const path = require('path');

router.get('/add-product', adminController.getAddProducts);

router.post('/add-product', adminController.postAddProducts);

router.get('/edit-product', adminController.getEditProducts);

router.post('/edit-product', adminController.postEditProducts)

router.get('/products', adminController.getProducts);

module.exports = router;