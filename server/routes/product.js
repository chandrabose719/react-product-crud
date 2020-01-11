const express = require('express');

const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
	destination: function(req, file, callback){
		if(file.originalname != ''){
			callback(null, "./products/images/");
		}else{
			callback(null, false);
		}
	},
	filename: function(req, file, callback){
		callback(null, file.originalname);
	}
});
const fileFilter = function(req, file, callback){
	if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
		callback(null, true);
	}else{
		callback(new Error('File format is incorrect!'), false);
	}
};
const upload = multer({
	storage: storage,
	fileFilter: fileFilter
});

const Product = require('../models/product');

// All Product
router.get('/', async function(req, res, next){
	try{
		let products = await Product.find();
		let result = {
			"count":products.length,
			"data":products
		}
		res.status(201).json(result);
	}catch(err){
		next(err);
	}
});

router.get('/:id', async function(req, res, next){
	var id = {
		"_id": req.params.id
	}
	try{
		let getResult = await Product.findOne(id);
		if (getResult != null) {
			result = {
				"data":getResult
			}
		}else{
			result = {
				"data":"Data not found!"
			}
		}
		res.status(201).json(result);	
	}catch(err){
		next(err);
	}
});

// Insert Product
router.post('/', upload.single('image'), async function(req, res, next){
	let productData = {
		title:req.body.title,
		description:req.body.description,
		price:req.body.price,
		image:'http://localhost:3401/'+req.file.path
	};
	try{
		let product = new Product(productData);
		let insertResult = await product.save();
		let result = {
			"data":insertResult,
			"message":"New product added successfully!"
		}
		res.status(201).json(result);
	}catch(err){
		next(err);
	}
});

// Edit Product
router.put('/:id', upload.single('image'), async function(req, res, next){
	if(req.file != undefined){
		var productData = {
			title:req.body.title,
			description:req.body.description,
			price:req.body.price,
			image:'http://localhost:3401/'+req.file.path
		};
	}else{
		var productData = {
			title:req.body.title,
			description:req.body.description,
			price:req.body.price
		};		
	}
	var id = {
		_id: req.params.id
	};
	try{
		let updateResult = await Product.updateOne(id, productData);
		if(updateResult.nModified == true){
			let getResult = await Product.findOne(id);
			let result = {
				"data": getResult,
				"message": "Product details updated successfully!"
			}
			res.status(201).json(result);	
		}
	}catch(err){
		next(err);
	}	
});

// Delete All
router.delete('/', async function(req, res, next){
	try{
		let deleteResult = await Product.deleteMany();
		if(deleteResult.deletedCount > 0){ 
			result = {
				"message": 'All products are deleted successfully!'
			}
		}else{
			result = {
				"message": 'Data not found!'
			}
		}
		res.status(201).json(result);
	}catch(err){
		next(err);
	}	
});

// Delete By ID
router.delete('/:id', async function(req, res, next){
	var id = {
		_id: req.params.id
	};
	try{
		let deleteResult = await Product.deleteOne(id);
		if(deleteResult.deletedCount > 0){ 
			result = {
				"message": 'Product details deleted successfully!'
			}
		}else{
			result = {
				"message": 'Data not found!'
			}
		}
		res.status(201).json(result);	
	}catch(err){
		next(err);
	}	
});

module.exports = router;


