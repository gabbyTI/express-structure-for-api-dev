exports.helloWord = (req, res) => {
	res.status(200).json({
		message: 'Hello World!!!!',
	});
};
