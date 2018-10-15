const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/home');
const { asyncErrorDecorator } = require('../utils/error');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', asyncErrorDecorator(controller.get));

router.post('/signup', jsonParser, asyncErrorDecorator(controller.signup));

module.exports = router;
