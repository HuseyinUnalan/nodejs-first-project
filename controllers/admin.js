const Product = require('../models/product');
const Category = require('../models/category');

module.exports.getProducts = (req, res, next) => {
    const products = Product.getAll();

    Product.getAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products[0],
                path: 'admin/products',
                action: req.query.action

            });
        })
        .catch((err) => {
            console.log(err);
        })


}

module.exports.getAddProducts = (req, res, next) => {
    const categories = Category.getAll();
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('admin/add-product', {
        title: 'Add a New Product',
        path: '/admin/add-product',
        categories: categories

    });
}

exports.postAddProducts = (req, res, next) => {
    const product = new Product();

    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.categoryid = req.body.categoryid;
    product.description = req.body.description;

    product.saveProduct();

    console.log(req.body);
    res.redirect('/');
}

module.exports.getEditProducts = (req, res, next) => {

    const categories = Category.getAll();
    Product.getById(req.params.productid);

    Product.getById(req.params.productid)
        .then((product) => {
            res.render('admin/edit-product', {
                title: product[0][0].name + ' Edit Product',
                path: '/admin/products',
                product: product[0][0],
                categories: categories
            });
        })
        .catch((err => {
            console.log(err);
        }));

}

exports.postEditProducts = (req, res, next) => {

    const product = Product.getById(req.body.id);

    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;


    Product.Update(product);
    res.redirect('/admin/products?action=edit');
}

exports.postProductDelete = (req, res, next) => {
    Product.DeleteById(req.body.productid);
    res.redirect('/admin/products?action=delete');
}