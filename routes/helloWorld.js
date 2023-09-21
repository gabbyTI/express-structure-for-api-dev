const express = require('express');
const helloWorldController = require('../controllers/helloWorldController');

const router = express.Router();

router.route('/').get(helloWorldController.helloWord);
router.route('/create').get(helloWorldController.createHello);

module.exports = router;
