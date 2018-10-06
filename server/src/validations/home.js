const helpers = require('../utils/helpers');
const User = require('../models/user');

const signup = async (req) => {
	const validation = {
		status: 422,
		messages: []
	};
	const body = req.body;


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
		const olduser = await User.findOne({ username: body.username })
		.select('name')
		.exec(function (err, result) {
			return result;
		});
		if (olduser !== null) {
			validation.status = 409;
			validation.messages.push('Username already exist!');
		};
	};

	return validation.messages.length === 0 ? true : validation;
};


module.exports = {
  signup,
};
