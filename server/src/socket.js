const { authorize } = require('./socket/authentication');
const { search } = require('./socket/user');
const ClientStore = require('./socket/client');
const Room = require('./socket/room');
const Channel = require('./socket/channel');

const Socket = (client) => {
	var ClientID = client.id;

	client.on('authenticate', (req) => authorize(req, client) );
	client.on('search_room', (req) => Room.add(req, client) );
	client.on('get_room', (req) => Room.get(req, client) );
	client.on('add_room', (req) => Room.add(req, client) );

	client.on('get_room_channel', (req) => Channel.get(req, client) );
	client.on('add_room_channel', (req) => Channel.add(req, client) );



	// client.on('search_user', (req) => search(req, client) );
	// client.on('add_chatroom', (req) => ChatRoom.add(req, client) );
	// client.on('get_chatroom', (req) => ChatRoom.get(req, client) );
	// client.on('add_message', (req) => ChatMessage.add(req, client) );
	// client.on('get_message', (req) => ChatMessage.get(req, client) );
}

module.exports = Socket;
