const express = require('express');
const morgan = require('morgan');
const helloWorldRouter = require('./routes/helloWorld');
const globalErrorHandler = require('./exceptions/handler');

const AppError = require('./utils/appError');

const app = express();

console.log(`You are in ${process.env.NODE_ENV} environment.`);

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev')); // prints the request info
}

// allows a post body to be added to the request object
app.use(express.json());

//Routes
app.use('/api/v1/helloWorld', helloWorldRouter);

// Catching routes not found in the server
app.all('*', (req, res, next) => {
	const error = new AppError(
		`Cant't find ${req.originalUrl} on this server!`,
		404
	);
	next(error);
});

app.use(globalErrorHandler);

module.exports = app;
