const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	status:{
		type:String,
		default: 'active'
	},	
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Product', productSchema);

