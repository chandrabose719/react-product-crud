const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors
app.use(cors());

// Static
app.use('/products/images', express.static('products/images'));

// Routes
const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/product');

app.use('/', homeRoutes);
app.use('/product', productRoutes);

// Error
app.use(function(req, res, next){
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use(function(error, req, res, next){
	res.status(error.status || 500);
	res.json({
		"message": error.message
	});
});

module.exports = app;


