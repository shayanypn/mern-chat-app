const mongoose = require('mongoose');
const User = require('../models/user');
const Room = require('../models/room');
const Channel = require('../models/channel');
const Message = require('../models/message');

const get = (req, client, ClientStore) => {

	if (ClientStore.notValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
		return;
	};
	const RequestUser = ClientStore.get(client.id);

	if (!req || !req.channel || !req.room) {
		client.emit('get_channel_message', null, {
			status: 422
		});
		return;
	}

	try {
		Message.find({
			room: req.room,
			channel: req.channel
		})
		.populate('author', 'name avatar')
		.exec(function (fail, success) {
			if (success) {
				client.emit('get_channel_message', success, null );
			}
			if (fail) {
			    // TODO handle 401
			}
		});
	}catch(e){
		client.emit('get_channel_message', null , {
			status: 500,
			message: e
		});
	}
}

const add = (req, client, ClientStore) => {
	if (ClientStore.notValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
		return;
	};
	const RequestUser = ClientStore.get(client.id);

	if (!req || !req.channel || !req.room || !RequestUser._id) {
		client.emit('add_channel_message', null, {
			status: 422
		});
		return;
	}

	try {
		Channel.find({
			_id: req.channel,
			room: req.room
		})
		.select('name')
		.exec(function (fail, success) {
			if (success) {
				if (success.length !== 0) {
					Message.create({
						_id: new mongoose.Types.ObjectId(),
						author: RequestUser._id,
						room: req.room,
						channel: req.channel,
						text: req.text,
						image: req.image,
						date: req.date,
					}, function (fail, result) {
						client.emit('add_channel_message', {
							status: 201
						}, null );
					});
				} else {
					client.emit('add_channel_message', null, {
						status: 409
					});
				}
			}

			if (fail) {
				// TODO handle 404
			}
		});
	}catch(e){
		client.emit('add_channel_message', null , {
			status: 500,
			message: e
		});
	}
}

const update = (req, client, ClientStore) => {
	if (ClientStore.notValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
		return;
	};
	const RequestUser = ClientStore.get(client.id);

	if (!req || !req.id || !req.message || !RequestUser._id) {
		client.emit('update_message', null, {
			status: 422
		});
		return;
	}

	try {
		Message.findOne({
			_id: req.id
		})
		.select('_id')
		.exec(function (fail, success) {
			if (success) {
				if (success.length !== 0) {

					Message.findByIdAndUpdate(
						req.id,
						{$set:{text: req.message}},
						{new: true},
						function(err, result){
							if (result) {
								client.emit('update_message', {
									id: req.id,
									status: 200
								}, null);
							}
							if(err){
								//  TODO
							}
						}
					);
				} else {
					client.emit('update_message', null, {
						status: 409
					});
				}
			}
			if (fail) {
				// TODO handle 404
			}
		});
	}catch(e){
		client.emit('update_message', null , {
			status: 500,
			message: e
		});
	}
}

const deleteById = (req, client, ClientStore) => {
	if (ClientStore.notValid(client.id)) {
		client.emit('authenticate', null, {
			status: 401
		});
		return;
	};
	const RequestUser = ClientStore.get(client.id);

	if (!req || !req.id || !RequestUser._id) {
		client.emit('delete_message', null, {
			status: 422
		});
		return;
	}

	try {
		Message.findOne({
			_id: req.id
		})
		.select('_id')
		.exec(function (fail, success) {
			if (success) {
				if (success.length !== 0) {
					Message.remove({ _id: req.id }, function(err) {
						if (!err) {
							client.emit('delete_message', {
								id: req.id,
								status: 204
							}, null );
						} else {
						}
					});
				} else {
					client.emit('delete_message', null, {
						status: 404
					});
				}
			}

			if (fail) {
				// TODO handle 404
			}
		});
	}catch(e){
		client.emit('delete_message', null , {
			status: 500,
			message: e
		});
	}
}

module.exports = {
	get,
	add,
	update,
	deleteById
};
