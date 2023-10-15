const products = [
    { name: 'Samsung S8', price: 3000, image: 'e.jpg', description: 'İyi' },
    { name: 'Samsung S7', price: 2000, image: 'b.jpg', description: 'İdare Eder' },
    { name: 'Samsung S9', price: 4000, image: 'c.jpg', description: 'Güzel' },
    { name: 'Iphone X', price: 45000, image: 'd.jpg', description: 'Çok İyi' },
];

module.exports.getProducts = (req, res, next) => {

    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    res.render('index', {
        title: 'Homepage',
        products: products,
        path: '/'
    });
}

module.exports.getAddProducts = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('add-product', {
        title: 'Add a New Product',
        path: '/admin/add-product'

    });
}

exports.postAddProducts = (req, res, next) => {
    products.push({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    });
    console.log(req.body);
    res.redirect('/');
}