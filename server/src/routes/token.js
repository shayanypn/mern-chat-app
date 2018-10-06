const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/token');
const { asyncErrorDecorator } = require('../utils/error');

const router = express.Router();
const jsonParser = bodyParser.json();


router.get('/:token', asyncErrorDecorator(controller.getByToken));

router.post('/', jsonParser, asyncErrorDecorator(controller.create));

router.delete('/:token', asyncErrorDecorator(controller.deleteByToken));

module.exports = router;
