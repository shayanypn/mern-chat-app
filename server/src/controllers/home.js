const validation = require('../validations/home');
const User = require('../models/user');

const get = async (req, res) => {
	res.send({
		status: 200,
		version: '0.0.1'
	});
};

const signup = async (req, res) => {

	const validate = await validation.signup(req);
	if (validate !== true) {
		return res.status(validate.status).send(validate);
	}

	const user = await User.create({
		username: req.body.username,
		password: req.body.password,
		token: '',
		name: req.body.username.split('@')[0],
	});


	res.status(201).send({
		username: user.username,
		name: user.name
	});
}


module.exports = {
  get,
  signup,
};
