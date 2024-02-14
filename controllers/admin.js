const Product = require('../models/product');
const Category = require('../models/category');

module.exports.getProducts = (req, res, next) => {

    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: 'admin/products',
                action: req.query.action

            });
        })
        .catch((err) => {
            console.log(err);
        })


}

module.exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'Add a New Product',
        path: '/admin/add-product',
        // categories: categories[0]
    });
}

exports.postAddProducts = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    // const categoryid = req.body.categoryid;
    /*
        Product.create({
                name: name,
                price: price,
                imageUrl: imageUrl,
                description: description
            })
            .then(result => {
                console.log(result);
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            });
    */

    const prd = Product.build({
        name: name,
        price: price,
        imageUrl: imageUrl,
        description: description
    });

    prd.save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.timeLog(err);
        })

}

module.exports.getEditProducts = (req, res, next) => {


    Product.findByPk(req.params.productid)
        .then((product) => {

            Category.findAll()
                .then((categories) => {
                    res.render('admin/edit-product', {
                        title: product.name + ' Edit Product',
                        path: '/admin/products',
                        product: product,
                        categories: categories
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err => {
            console.log(err);
        }));

}

exports.postEditProducts = (req, res, next) => {

    const product = new Product();

    product.id = req.body.id;
    product.name = req.body.name;
    product.price = req.body.price;
    product.imageUrl = req.body.imageUrl;
    product.description = req.body.description;
    product.categoryid = req.body.categoryid;


    Product.Update(product)
        .then(() => {
            res.redirect('/admin/products?action=edit');
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postProductDelete = (req, res, next) => {
    Product.DeleteById(req.body.productid)
        .then(() => {
            res.redirect('/admin/products?action=delete');

        })
        .catch((err) => {
            console.log(err);
        });
}