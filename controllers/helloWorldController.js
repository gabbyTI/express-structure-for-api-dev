const Hello = require('../models/helloWorld');
const factory = require('./handlerFactory');

exports.helloWord = (req, res) => {
	res.status(200).json({
		message: 'Hello World!!!!',
	});
};

exports.createHello = factory.createOne(Hello);
