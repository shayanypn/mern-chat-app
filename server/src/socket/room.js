const Room = require('../models/room');
const ClientStore = require('./client');


const search = (req, client) => {
	if (ClientStore.isValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
	};

	try {
		Room.find({ name: new RegExp(req.name, 'i') })
		.select('name description user_count')
		.exec(function (fail, success) {
			
			if (fail) {
				// TODO handle 400
			}
			
			if (success) {
				client.emit('search_room', success, null );
			}
		});
	}catch(e){
		client.emit('search_room', null , {
			status: 500,
			message: e
		});
	}
};


const add = (req, client) => {
	if (ClientStore.isValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
	};
	const RequestUser = ClientStore.get(client.id);

	try {
		Room.find({
			name: req.name
		})
		.select('name')
		.exec(function (fail, success) {
	
			if (fail) {
				// TODO handle 404
			}
			
			if (success) {
				
				if (success.length === 0) {
					Room.create({
						user: RequestUser._id,
						name: req.name,
						description: req.name,
						// users: [],
						user_count: 1,
					}, function (fail, success) {
						client.emit('add_room', {
							status: 201
						}, null );
					});
				} else {
					client.emit('add_room', null, {
						status: 409
					} );
				}
			}
		});
	}catch(e){
		client.emit('add_room', null , {
			status: 500,
			message: e
		});
	}
}

const get = (req, client) => {

	if (ClientStore.isValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
	};
	const RequestUser = ClientStore.get(client.id);


	try {
		Room.find({})
		.select('_id name description')
		.exec(function (fail, success) {

			if (fail) {
			    // TODO handle 401
			}

			if (success) {
				client.emit('get_room', success, null );
			}
		});
	}catch(e){
		client.emit('get_room', null , {
			status: 500,
			message: e
		});
	}
}

module.exports = {
	search,
	add,
	get,
};
