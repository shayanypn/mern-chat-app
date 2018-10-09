
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

	isValid(client_id){
		if (!this.clients[client_id]) {
			return false;
		}

		return this.clients[client_id].validate
	}
}

module.exports = new Client();
