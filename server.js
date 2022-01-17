const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

// This loads data from the config.env file into the application
dotenv.config({ path: './config.env' });

const app = require('./app');

/** Connecting to Atlas DB

    const DB_CONNECTION_STRING = process.env.DATABASE.replace(
        '<PASSWORD>',
        encodeURIComponent(process.env.DATABASE_PASSWORD)
    );

    mongoose.connect(DB_CONNECTION_STRING).then(() => {
        console.log('DB Connection Successful');
    });

*/

/** Connecting to local DB
 
    mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
        console.log('DB Connection Successful');
    });

 */

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
	console.log(`App is running on http://127.0.0.1:${port}`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
