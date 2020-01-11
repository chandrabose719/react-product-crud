const express = require('express');
const router = express.Router();

// GET Method
router.get('/', function(req, res, next){
	res.status(201).json({
		data: 'Welcome to Product CRUD!'
	});
});

module.exports = router;


