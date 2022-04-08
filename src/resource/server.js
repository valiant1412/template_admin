const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParse = require('body-parser');
const handlebars = require('express-handlebars');

const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');


const { required } = require('nodemon/lib/config');


//Using cookie
app.use(cookieParser())

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// Encode URL
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(methodOverride('_method'));


app.engine('html', require('ejs').renderFile);

// Access to static file
app.use(express.static(path.join(__dirname, '../public')));

// Template engine
const hbs = handlebars.create({
    extname: '.hbs',

    //create custom helpers
    helpers: {
        json: function(context) {
            return JSON.stringify(context);
        }
    }
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('home');
})
app.get('/product', (req, res) => {
    res.render('productManager');
})
app.get('/addProduct', (req, res) => {
    res.render('addProduct');
})

// Start server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})