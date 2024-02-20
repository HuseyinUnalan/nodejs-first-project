const Product = require('../models/product')
    // const Category = require('../models/category')


module.exports.getIndex = (req, res, next) => {


    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                title: 'Shopping',
                products: products,
                path: '/'
            });
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
            res.render('shop/products', {
                title: 'Products',
                products: products,
                path: '/products'
            });
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
    Product.findById(req.params.productid)
        .then(product => {
            console.log(req.params.productid)
            res.render('shop/product-detail', {
                title: product.name,
                path: '/products',
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
}



module.exports.getCart = (req, res, next) => {

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        title: 'Cart',
                        path: '/cart',
                        products: products
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })

}

module.exports.postCart = (req, res, next) => {

    const productId = req.body.productId;
    let quantity = 1; // req.body.quantity
    let userCart;

    req.user
        .getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then(products => {
            let product;

            if (products.length > 0) {
                product = products[0]
            }

            if (product) {
                quantity += product.cartItem.quantity;
                return product;
            }

            return Product.findByPk(productId);
        })
        .then(product => {
            userCart.addProduct(product, {
                through: {
                    quantity: quantity
                }
            })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })

}

module.exports.postCartItemDelete = (req, res, next) => {
    const productid = req.body.productid;

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productid } })
        })
        .then(products => {
            const product = products[0];

            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })


}

module.exports.getOrders = (req, res, next) => {

    req.user
        .getOrders({ include: ['products'] })
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                title: 'Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => {
            console.log(err);
        })


}

module.exports.postOrder = (req, res, next) => {
    let userCart;
    req.user
        .getCart()
        .then(cart => {
            userCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity,
                            price: product.price
                        }
                        return product;
                    }));
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .then(() => {
            userCart.setProducts(null);
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        })

}