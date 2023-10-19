const Product = require('../models/product')


module.exports.getProducts = (req, res, next) => {
    const products = Product.getAll();
    res.render('admin/products', {
        title: 'Admin Products',
        products: products,
        path: 'admin/products',
        action: req.query.action

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

    const product = Product.getById(req.params.productid);

    res.render('admin/edit-product', {
        title: 'Edit Product',
        path: '/admin/products',
        product: product

    });
}

exports.postEditProducts = (req, res, next) => {

    const product = Product.getById(req.body.id);

    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;

    Product.Update(product);
    res.redirect('/admin/products?action=edit');
}