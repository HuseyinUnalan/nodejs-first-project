const Product = require('../models/product');
// const Category = require('../models/category');

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
    });


}

exports.postAddProducts = (req, res, next) => {

    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    // First Record Addition Method
    const product = new Product(name, price, description, imageUrl);

    product.save()
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });

    // Second Record Addition Method

    /*
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
    */
}

module.exports.getEditProduct = (req, res, next) => {

    Product.findById(req.params.productid)
        .then(product => {
            console.log(product);
            res.render('admin/edit-product', {
                title: 'Edit Product',
                path: '/admin/products',
                product: product
            });
        })
        .catch(err => { console.log(err) });



}

exports.postEditProducts = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    // const categoryid = req.body.categoryid;

    const product = new Product(name, price, description, imageUrl, id);

    product.save()
        .then(result => {
            res.redirect('/admin/products?action=edit');
        })
        .catch(err => console.log(err))

}

exports.postProductDelete = (req, res, next) => {

    const id = req.body.productid;

    Product.deleteById(id)
        .then(() => {
            console.log('Product has been delected');
            res.redirect('/admin/products?action=delete');
        })
        .catch(err => {
            console.log(err);
        });



}

// Category Transactions

// module.exports.getCategories = (req, res, next) => {

//     Category.findAll()
//         .then(categories => {
//             res.render('admin/categories', {
//                 title: 'Admin Categories',
//                 categories: categories,
//                 path: 'admin/categories',
//                 action: req.query.action

//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

// module.exports.getAddCategory = (req, res, next) => {
//     res.render('admin/add-category', {
//         title: 'Add a New Category',
//         path: '/admin/add-category',
//     });
// }


// exports.postAddCategory = (req, res, next) => {

//     const name = req.body.name;
//     const description = req.body.description;

//     const ctg = Category.build({
//         name: name,
//         description: description
//     });

//     ctg.save()
//         .then(result => {
//             console.log(result);
//             res.redirect('/admin/add-category');
//         })
//         .catch(err => {
//             console.timeLog(err);
//         })

// }