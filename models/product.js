const { ObjectId } = require('mongodb');
const getDb = require('../utility/database').getdb;

class Product {
    constructor(name, price, description, imageUrl, id) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new ObjectId(id) : null;
    }

    save() {
        let db = getDb();

        if (this._id) {
            db = db.collection('products').updateOne({ _id: this._id }, { $set: this });

        } else {
            db = db.collection('products').insertOne(this)
        }

        return db
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findAll() {
        const db = getDb();
        return db.collection('products')
            .find({})
            .project({ name: 1, price: 1, imageUrl: 1 })
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(productid) {
        const db = getDb();
        // return db.collection('products')
        //     .find({ _id: new ObjectId(productid) })
        //     .toArray()
        //     .then(products => {
        //         return products;
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });

        return db.collection('products')
            .findOne({ _id: new ObjectId(productid) })
            .then(product => {
                return product;
            })
            .catch(err => {
                console.log(err);
            });

    }

    static deleteById(productid) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: new ObjectId(productid) })
            .then(() => {
                console.log('deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }

}

module.exports = Product;