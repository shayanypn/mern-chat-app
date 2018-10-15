const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/user');
const { asyncErrorDecorator } = require('../utils/error');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', asyncErrorDecorator(controller.getOne));

router.put('/', jsonParser, asyncErrorDecorator(controller.updateOne));

router.put('/avatar', jsonParser, asyncErrorDecorator(controller.updateAvatar));

module.exports = router;
