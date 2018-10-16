const helpers = require('../utils/helpers');
const User = require('../models/user');

const create = async (req) => {
	const validation = {
		status: 422,
		messages: []
	};
	const { body } = req;


	if (!helpers.hasValue(body.username)) {
		validation.messages.push('Username could not be empty');
	}
	if (!helpers.hasValue(body.password)) {
		validation.messages.push('Password could not be empty');
	}
	if (!helpers.isEmailAddress(body.username)) {
		validation.messages.push('Username should be valid email address');
	}
	if (validation.messages.length === 0) {
		const userObj = await User.findOne({
			username: body.username,
			password: body.password
		})
		.select('name')
		.exec(function (err, result) {
			return result;
		});
		if (userObj === null) {
			validation.status = 401;
			validation.messages.push('Username or Password is not valid!');
		};
	};

	return validation.messages.length === 0 ? true : validation;
};

const getByToken  = async (req) => {
	const validation = {
		status: 422,
		messages: []
	};
	const { token } = req.params;

	if (!helpers.hasValue(token)) {
		validation.messages.push('Token could not be empty');
	}

	return validation.messages.length === 0 ? true : validation;
};

const deleteByToken = async (req) => {
	const validation = {
		status: 422,
		messages: []
	};
	const { token } = req.params;

	if (!helpers.hasValue(token)) {
		validation.messages.push('Token could not be empty');
	}

	return validation.messages.length === 0 ? true : validation;
};

module.exports = {
  create,
  getByToken,
  deleteByToken
};
