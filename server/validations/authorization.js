const helpers = require('../utils/helpers');

const check = async (req) => {
	const validation = {
		status: 422,
		messages: []
	};
	const { headers } = req;

	if (!helpers.hasValue(headers.authorization)) {
		validation.messages.push('Authorization Problem');
	}

	return validation.messages.length === 0 ? true : validation;
};

module.exports = {
	check
};
