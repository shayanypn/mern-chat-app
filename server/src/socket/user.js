const User = require('../models/user');
const ClientStore = require('./client');


const search = (req, client) => {

	if (ClientStore.isValid(client.id)) {
		client.emit('authenticate', '401' , null );
	};

	try {
		User.find({ username: new RegExp(req.username, 'i') })
		.select('name username')
		.exec(function (fail, success) {
			
			if (fail) {
				// TODO handle 401
			}
			
			if (success) {
				client.emit('search_user', null, success );
			}

			client.emit('search_user', 'NORESULT', null );
		});
	}catch(e){
		client.emit('search_user', 'Invalid Params' , null );
	}
};


module.exports = {
	search
};
