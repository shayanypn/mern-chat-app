const { authorize } = require('./socket/authentication');
const { search } = require('./socket/user');
const ChatRoom = require('./socket/chat_room');
const ClientStore = require('./socket/client');


const Socket = (client) => {
	var ClientID = client.id;

	client.on('authenticate', (req) => authorize(req, client) );
	client.on('search_user', (req) => search(req, client) );
	client.on('add_chatroom', (req) => ChatRoom.add(req, client) );
	client.on('get_chatroom', (req) => ChatRoom.get(req, client) );
}


module.exports = Socket;
