const Product = require('../models/product')
const Category = require('../models/category')


module.exports.getIndex = (req, res, next) => {


    Product.findAll({
            attributes: ['id', 'name', 'price', 'imageUrl'],
        })
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/index', {
                        title: 'Shopping',
                        products: products,
                        categories: categories,
                        path: '/'
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        });


}


module.exports.getProducts = (req, res, next) => {

    Product.findAll({
            attributes: ['id', 'name', 'price', 'imageUrl'],
        })
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/products', {
                        title: 'Products',
                        products: products,
                        categories: categories,
                        path: '/products'
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        });


}

module.exports.getProductsByCategoryId = (req, res, next) => {
    const categoryid = req.params.categoryid;
    const model = [];

    Category.findAll()
        .then(categories => {
            model.categories = categories;
            const category = categories.find(i => i.id == categoryid);
            return category.getProducts();
        })
        .then(products => {
            res.render('shop/products', {
                title: 'Products',
                products: products,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports.getProduct = (req, res, next) => {

    Product.findAll({
            attributes: ['id', 'name', 'price', 'imageUrl', 'description'],
            where: { id: req.params.productid }

        })
        .then(products => {
            res.render('shop/product-detail', {
                title: products[0].name,
                product: products[0],
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });

    /*
    Product.findByPk(req.params.productid)
        .then((product) => {

            res.render('shop/product-detail', {
                title: product.name,
                product: product,
                path: '/products'
            });
        })
        .catch((err => {
            console.log(err);
        }));
    */


}



module.exports.getCart = (req, res, next) => {
    const products = Product.getAll();
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    res.render('shop/cart', {
        title: 'Cart',
        path: '/cart'
    });
}

module.exports.getOrders = (req, res, next) => {
    const products = Product.getAll();
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    res.render('shop/orders', {
        title: 'Orders',
        path: '/orders'
    });
}