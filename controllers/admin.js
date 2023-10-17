const Product = require('../models/product')


module.exports.getProducts = (req, res, next) => {
    const products = Product.getAll();
    res.render('admin/products', {
        title: 'Admin Products',
        products: products,
        path: 'admin/products'

    });
}

module.exports.getAddProducts = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('admin/add-product', {
        title: 'Add a New Product',
        path: '/admin/add-product'

    });
}

exports.postAddProducts = (req, res, next) => {
    const product = new Product(
        req.body.name,
        req.body.price,
        req.body.imageUrl,
        req.body.description
    );
    product.saveProduct();

    console.log(req.body);
    res.redirect('/');
}

module.exports.getEditProducts = (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('admin/edit-product', {
        title: 'Edit Product',
        path: '/admin/edit-product'

    });
}

exports.postEditProducts = (req, res, next) => {

    res.redirect('/');
}