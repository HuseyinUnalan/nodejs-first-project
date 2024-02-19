const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    // MongoClient.connect('mongodb://127.0.0.1:27017/node-app') // For Local Connection
    MongoClient.connect('mongodb+srv://huseyin66unalan:2rgzJDJzDXN0gcws@cluster0.5qidw0c.mongodb.net/node-app?retryWrites=true&w=majoritycls')
        .then(client => {
            console.log('Connected to MongoDB');
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log('Error connecting to MongoDB:', err);
            throw err;
        });
};

const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database';
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;