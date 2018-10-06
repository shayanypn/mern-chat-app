const helpers = require('../utils/helpers');
const User = require('../models/user');
const Authorization = require('./authorization');

const getById  = async (req) => {
	const validation = {
		status: 422,
		messages: []
	};
    const validate = await Authorization.check(req);

    if (validate !== true) {
        return validate;
    }

	return validation.messages.length === 0 ? true : validation;
};

const updateOne  = async (req) => {
	const validation = {
		status: 422,
		messages: []
	};
	const { body } = req;
	const validate = await Authorization.check(req);
	
	if (validate !== true) {
		return validate;
	}


	if (!helpers.hasValue(body.name)) {
		validation.messages.push('Name could not be empty');
	}

	return validation.messages.length === 0 ? true : validation;
};

module.exports = {
	getById,
	updateOne
};
