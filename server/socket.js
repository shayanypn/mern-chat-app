const { authorize } = require('./socket/authentication');
const { search } = require('./socket/user');
const ClientStore = require('./socket/client');
const Room = require('./socket/room');
const Channel = require('./socket/channel');
const Message = require('./socket/message');

const Socket = (client) => {
	var ClientID = client.id;

	client.on('authenticate', (req) => authorize(req, client, ClientStore) );
	client.on('search_room', (req) => Room.add(req, client, ClientStore) );
	client.on('get_room', (req) => Room.get(req, client, ClientStore) );
	client.on('add_room', (req) => Room.add(req, client, ClientStore) );

	client.on('get_room_channel', (req) => Channel.get(req, client, ClientStore) );
	client.on('add_room_channel', (req) => Channel.add(req, client, ClientStore) );

	client.on('get_channel_message', (req) => Message.get(req, client, ClientStore) );
	client.on('add_channel_message', (req) => Message.add(req, client, ClientStore) );

	client.on('update_message', (req) => Message.update(req, client, ClientStore) );
	client.on('delete_message', (req) => Message.deleteById(req, client, ClientStore) );

}

module.exports = Socket;
