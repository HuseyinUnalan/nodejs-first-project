const products = [
    { id: "15151", name: 'Samsung S6', price: 2000, imageUrl: 'e.jpg', description: 'İyi Ürün', categoryid: "1" },
    { id: "14141", name: 'Samsung S8', price: 1500, imageUrl: 'd.jpg', description: 'Güzel Ürün', categoryid: "2" }


];

module.exports = class Product {

    constructor(name, price, imageUrl, description, categoryid) {
        this.id = (Math.floor(Math.random() * 99999) + 1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.categoryid = categoryid;

    }

    saveProduct() {
        products.push(this);
    }

    static getAll() {
        return products;
    }

    static getById(id) {
        const product = products.find(i => i.id === id);
        return product;
    }

    static getProductsByCategoryId(categoryid) {
        return products.filter(i => i.categoryid == categoryid);
    }

    static Update(product) {
        const index = products.findIndex(i => i.id === product.id);

        products[index].name = product.name;
        products[index].price = product.price;
        products[index].imageUrl = product.imageUrl;
        products[index].description = product.description;
        products[index].categoryid = product.categoryid;

    }

    static DeleteById(id) {
        const index = products.findIndex(i => i.id === id);
        products.splice(index, 1);
    }

}

// const product = Product.getAll();

// const p = new Product('Samsung', 2000, 'e.jpg', 'İyi Telefon');
// p.saveProduct();