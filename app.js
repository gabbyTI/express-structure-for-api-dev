const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const helloWorldRouter = require('./routes/helloWorld');
const globalErrorHandler = require('./exceptions/handler');

const AppError = require('./utils/appError');

const app = express();

//Set security http headers
app.use(helmet())

console.log(`You are in ${process.env.NODE_ENV} environment.`);

// Development Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev')); // prints the request info
}

// Limits number of request from an IP
const limiter = rateLimit({
	max: 100, // no of request
	windowMs: 60 * 60 * 1000, // reset time in milliseconds (1 hour)
	message: 'Too many requests from this IP, please try again in an hour!'
});

// Applying the limiter to only api routes
app.use('/api',limiter);

// Body Parser, allows a post body to be added to the request object
app.use(express.json());

//Data sanitization against NoSQL query injection 
app.use(mongoSanitize());

//Data sanitization against XSS 
app.use(xss());

// Prevent parameter pollution (duplicate parameters)
app.use(hpp({
	whitelist: [
		// mention parameter values allowed to have duplicate value here
	]
}));

// Serving static files
app.use(express.static(`${__dirname}/public`));

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
