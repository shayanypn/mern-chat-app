const { authorize } = require('./socket/authentication');
const { search } = require('./socket/authentication');
const ClientStore = require('./socket/client');


const Socket = (client) => {
	var ClientID = client.id;

	client.on('authenticate', (req) => authorize(req, client) );
	client.on('search_user', (req) => search(req, client) );
}


module.exports = Socket;
