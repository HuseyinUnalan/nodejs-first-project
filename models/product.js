const products = [
    { name: 'Samsung S6', price: 2000, imageUrl: 'e.jpg', description: 'İyi Ürün' }
];

module.exports = class Product {

    constructor(name, price, imageUrl, description) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    saveProduct() {
        products.push(this);
    }

    static getAll() {
        return products;
    }

}

// const product = Product.getAll();

// const p = new Product('Samsung', 2000, 'e.jpg', 'İyi Telefon');
// p.saveProduct();