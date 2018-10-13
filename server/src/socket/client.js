
class Client {

	constructor() {
		this.clients = {};
	}

	add(client_id, client_info){
		this.clients[client_id] = Object.assign({}, client_info, {
	        validate: true
    	});
	}

	get(client_id){
		return this.clients[client_id] || null ;
	}

	notValid(client_id){
		if (!this.clients[client_id]) {
			return true;
		}

		return !this.clients[client_id].validate
	}
}

module.exports = new Client();
