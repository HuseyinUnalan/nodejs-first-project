const products = [
    { id: "15151", name: 'Samsung S6', price: 2000, imageUrl: 'e.jpg', description: 'İyi Ürün' },
    { id: "14141", name: 'Samsung S8', price: 1500, imageUrl: 'd.jpg', description: 'Güzel Ürün' }


];

module.exports = class Product {

    constructor(name, price, imageUrl, description) {
        this.id = Math.floor(Math.random() * 99999) + 1;
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