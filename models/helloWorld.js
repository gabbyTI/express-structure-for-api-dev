const mongoose = require('mongoose');
const validator = require('validator');

const helloSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name!'],
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please enter a valid email address'],
	},
	message: {
		type: String,
		default: 'hello world',
		lowercase: true,
	},
	helloType: {
		type: String,
		enum: {
			values: ['friendly', 'bombastic-side-eye', 'evil'],
			message: 'Enter a valid Type',
		},
		default: 'user',
	},
	helloDate: {
		type: Date,
		default: Date.now(),
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
});

const Hello = mongoose.model('Hello', helloSchema);

module.exports = Hello;
