const mongoose = require('mongoose');
const Room = require('../models/room');
const Channel = require('../models/channel');

const add = (req, client, ClientStore) => {
	if (ClientStore.notValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
		return;
	};
	const RequestUser = ClientStore.get(client.id);

	try {
		Channel.find({
			room: req.room_id,
			name: req.name
		})
		.select('name')
		.exec(function (fail, success) {
	
			if (success) {
				
				if (success.length === 0) {
					Channel.create({
						_id: new mongoose.Types.ObjectId(),
						user: RequestUser._id,
						room: req.room_id,
						name: req.name,
						description: req.name,
						user_count: 1,
					}, function (fail, success) {
						client.emit('add_room_channel', {
							status: 201
						}, null );
					});
				} else {
					client.emit('add_room_channel', null, {
						status: 409
					} );
				}
			}

			if (fail) {
				// TODO handle 404
			}
		});
	}catch(e){
		client.emit('add_room_channel', null , {
			status: 500,
			message: e
		});
	}
}

const get = (req, client, ClientStore) => {

	if (ClientStore.notValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
		return;
	};
	const RequestUser = ClientStore.get(client.id);

	if (!req || !req.room_id) {
		client.emit('get_room_channel', null, {
			status: 422
		});
		return;
	}

	try {
		Channel.find({
			room: req.room_id
		})
		.select('name description')
		.exec(function (fail, success) {

			if (fail) {
			    // TODO handle 401
			}

			if (success) {
				client.emit('get_room_channel', success, null );
			}
		});
	}catch(e){
		console.log(e);
		client.emit('get_room_channel', null , {
			status: 500,
			message: e
		});
	}
}

module.exports = {
	get,
	add,
};
