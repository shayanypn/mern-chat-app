const User = require('../models/user');

const search = (req, client, ClientStore) => {
	if (ClientStore.notValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
		return;
	};

	try {
		User.find({ username: new RegExp(req.username, 'i') })
		.select('name username avatar')
		.exec(function (fail, success) {
			
			if (success) {
				client.emit('search_user', success, null);
			}
			
			if (fail) {
				// TODO handle 401
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
