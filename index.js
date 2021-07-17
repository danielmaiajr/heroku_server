const express = require('express');
const app = express();

//Using the morgan middleware
const morgan = require('morgan');
app.use(morgan('dev'));

//Using the body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Using Sequelize to connect
require('./database');

//Passport inicialization middleware
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

//Using the router for the api
const customers = require('./src/routes/customers');
const addresses = require('./src/routes/addresses');
const payments = require('./src/routes/payments');
const orderStatus = require('./src/routes/orderStatus');
const cartItems = require('./src/routes/cartItems');
const products = require('./src/routes/products');
const orders = require('./src/routes/orders');
const scheduling = require('./src/routes/scheduling');

app.use('/api', customers);
app.use('/api', addresses);
app.use('/api', payments);
app.use('/api', orderStatus);
app.use('/api', cartItems);
app.use('/api', products);
app.use('/api', orders);
app.use('/api', scheduling);

app.listen(process.env.PORT || 5000, () => console.log(`Server running on Port 5000`));
