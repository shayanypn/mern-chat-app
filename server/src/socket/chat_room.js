const ChatRoom = require('../models/chat_room');
const User = require('../models/user');
const ClientStore = require('./client');


const add = (req, client) => {

	if (ClientStore.isValid(client.id)) {
		client.emit('authenticate', '401' , null );
	}
	const RequestUser = ClientStore.get(client.id);

	try {
		ChatRoom.find({$or:[
			{
				adminUser: RequestUser._id,
				joinedUser: req._id
			},
			{
				adminUser: req._id,
				joinedUser: RequestUser._id
			}
		]})
		.select('name')
		.exec(function (fail, success) {
	
			if (fail) {
				// TODO handle 404
			}
			
			if (success) {
				
				if (success.length === 0) {
					ChatRoom.create({
						adminUser: RequestUser._id,
						joinedUser: req._id,
						name: 'private',
						Description: 'private',
						isPrivate: true,
						userCount: 1,
					}, function (fail, success) {
						client.emit('add_chatroom', {
							status: 201
						}, null );
					});
				} else {
					client.emit('add_chatroom', {
						status: 409
					}, null );
				}
			}
		});
	}catch(e){
		client.emit('add_chatroom', 'Invalid Params' , null );        
	}
}

const get = (req, client) => {
    if (ClientStore.isValid(client.id)) {
        client.emit('authenticate', '401' , null );
    };
	const RequestUser = ClientStore.get(client.id);

    try {
		ChatRoom.find({
			adminUser: RequestUser._id
		})
		.select('_id joinedUser name description isPrivate')
		.exec(function (fail, success) {
            
            if (fail) {
                // TODO handle 401
            }

            if (success) {

				getChatList(success, client);
				return;
            }
            client.emit('get_chatroom', 'NORESULT', null );
        });
    }catch(e){
        client.emit('get_chatroom', 'Invalid Params' , null );
    }
}


const getChatList = (chat_rooms, client) => {

	var privateChats = chat_rooms.filter(x=> x.isPrivate).map(x=> {
		return {
			_id: x.joinedUser
		};
	});

	User.find({$or:privateChats})
	.select('name username')
	.exec(function (fail, success) {
		
		const chatLists = chat_rooms.map(x => {
			if (x.isPrivate) {
				let user = success.find(y => (y._id+'') == (x.joinedUser+''));
				if (user) {
					return Object.assign({}, x, {
						name: user.name,
						username: user.username
					});
				};
			}

			return x;
		});

	    client.emit('get_chatroom', null, chatLists );
	});

}


module.exports = {
	add,
	get
};
