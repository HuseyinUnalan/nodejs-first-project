const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', (req, res, next) => {

    const products = [
        { name: 'Samsung S8', price: 3000, image: 'e.jpg', description: 'İyi' },
        { name: 'Samsung S7', price: 2000, image: 'b.jpg', description: 'İdare Eder' },
        { name: 'Samsung S9', price: 4000, image: 'c.jpg', description: 'Güzel' },
        { name: 'Iphone X', price: 45000, image: 'd.jpg', description: 'Çok İyi' },
    ]

    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    res.render('index', { title: 'Homepage', products: products });
});

module.exports = router;