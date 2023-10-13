const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use((req, res) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { title: '404 Page Not Found' });

});


app.listen(3000, () => {
    console.log('Listenin on port 3000.');
});