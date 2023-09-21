/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const dbConnectionOptions = {
	development: {
		connectionString: process.env.DATABASE_LOCAL,
	},
	staging: {
		connectionString: process.env.DATABASE_CONNECION_STRING,
		placeholders: {
			'<PASSWORD>': process.env.DATABASE_PASSWORD,
			'<DB_NAME>': process.env.DATABASE_NAME,
			'<USERNAME>': process.env.DATABASE_USERNAME,
		},
	},
	production: {
		connectionString: process.env.DATABASE_CONNECION_STRING,
		placeholders: {
			'<PASSWORD>': process.env.DATABASE_PASSWORD,
			'<DB_NAME>': process.env.DATABASE_NAME,
			'<USERNAME>': process.env.DATABASE_USERNAME,
		},
	},
};

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = dbConnectionOptions[environment];

// Function to replace placeholders in the connection string
function replacePlaceholders(connectionString, placeholders) {
	let result = connectionString;
	for (const placeholder in placeholders) {
		if (placeholders.hasOwnProperty(placeholder)) {
			result = result.replace(placeholder, placeholders[placeholder]);
		}
	}
	return result;
}

module.exports = async () => {
	try {
		let dbConnectionString = environmentConfig.connectionString;

		if (environment === 'staging' || environment === 'production') {
			dbConnectionString = replacePlaceholders(
				environmentConfig.connectionString,
				environmentConfig.placeholders
			);
		}
		console.log('Connection string:', dbConnectionString);
		await mongoose.connect(dbConnectionString);
		console.log('DB Connection Successful');
	} catch (error) {
		console.log('DB Connection Error:', error);
		process.exit(1);
	}
};
