const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};
const handleDuplicateFieldsErrorDB = (err) => {
	const message = `Duplicate field value: ${err.keyValue.name}. Please use another value.`;
	return new AppError(message, 400);
};
const handleValidatorErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);

	const message = `Invalid Input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
};
const sendErrorDev = (error, res) => {
	res.status(error.statusCode).json({
		status: error.status,
		error,
		message: error.message,
		stack: error.stack,
	});
};

const sendErrorProd = (error, res) => {
	// Operatiional, trusted error: send message to client
	if (error.isOperational) {
		res.status(error.statusCode).json({
			status: error.status,
			message: error.message,
		});

		//Programming or other unknown error: dont't send leak error details
	} else {
		// Log error
		console.error('ERROR: ', error);

		//send generic message
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong!',
		});
	}
};

module.exports = (error, req, res, next) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(error, res);
	} else if (process.env.NODE_ENV === 'production') {
		console.log(`This is the Error name ${error.name}`);
		// eslint-disable-next-line node/no-unsupported-features/es-syntax
		let err = { ...error };

		err.message = error.message;

		if (error.name === 'CastError') err = handleCastErrorDB(err);
		if (error.code === 11000) err = handleDuplicateFieldsErrorDB(err);
		if (error.name === 'ValidationError') err = handleValidatorErrorDB(err);

		sendErrorProd(err, res);
	}
};
