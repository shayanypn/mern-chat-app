const Room = require('../models/room');
const Channel = require('../models/channel');
const Message = require('../models/message');
const ClientStore = require('./client');

const add = (req, client) => {
	if (ClientStore.isValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
	};
	const RequestUser = ClientStore.get(client.id);

	try {
		Channel.find({
			room: req.room_id,
			name: req.name
		})
		.select('name')
		.exec(function (fail, success) {
	
			if (fail) {
				// TODO handle 404
			}
			
			if (success) {
				
				if (success.length === 0) {
					Channel.create({
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
		});
	}catch(e){
		client.emit('add_room_channel', null , {
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
		Message.find({
			room: req.room_id,
			channel: req.channel_id
		})
		.select('name description')
		.exec(function (fail, success) {

			if (fail) {
			    // TODO handle 401
			}
			if (success) {
				client.emit('get_channel_message', success, null );
			}
		});
	}catch(e){
		client.emit('get_channel_message', null , {
			status: 500,
			message: e
		});
	}
}

module.exports = {
	get,
	add,
};
