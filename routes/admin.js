const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin')


// const path = require('path');

router.get('/add-product', adminController.getAddProducts);

router.post('/add-product', adminController.postAddProducts);

// router.get('/products/:productid', adminController.getEditProducts);

// router.post('/products', adminController.postEditProducts)

// router.get('/products', adminController.getProducts);

// router.post('/delete-product/', adminController.postProductDelete);



// // Category Transactions

// router.get('/add-category', adminController.getAddCategory);

// router.post('/add-category', adminController.postAddCategory);

// router.get('/categories', adminController.getCategories);

module.exports = router;