
class Client {

	constructor() {
		this.clients = {};
	}

	add(client_id, client_info){
		this.clients[client_id] = client_info;
	}
}

module.exports = new Client();
