const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/home');
const { asyncErrorDecorator } = require('../utils/error');

const router = express.Router();
const jsonParser = bodyParser.json();

// get all token
router.get('/', asyncErrorDecorator(controller.get));

module.exports = router;
