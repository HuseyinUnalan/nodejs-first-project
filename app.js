const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/products', (req, res) => {
    res.send('Products List');
});

app.listen(3000, () => {
    console.log('Listenin on port 3000.');
});