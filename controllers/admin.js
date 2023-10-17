// const Product = require('../models/product')

// module.exports.getAddProducts = (req, res, next) => {
//     // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
//     res.render('add-product', {
//         title: 'Add a New Product',
//         path: '/admin/add-product'

//     });
// }

// exports.postAddProducts = (req, res, next) => {
//     const product = new Product(
//         req.body.name,
//         req.body.price,
//         req.body.imageUrl,
//         req.body.description
//     );
//     product.saveProduct();

//     console.log(req.body);
//     res.redirect('/');
// }