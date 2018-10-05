const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/users');
const { asyncErrorDecorator } = require('../utils/error');

const router = express.Router();
const jsonParser = bodyParser.json();

// get all users
router.get('/', asyncErrorDecorator(controller.getAll));

// get user by id
router.get('/:id', asyncErrorDecorator(controller.getById));

// create user
router.post('/', jsonParser, asyncErrorDecorator(controller.create));

// update user by id
router.put('/:id', jsonParser, asyncErrorDecorator(controller.updateById));

// delete user by id
router.delete('/:id', asyncErrorDecorator(controller.deleteById));

module.exports = router;
