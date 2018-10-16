const User = require('../models/user');


const authorize = (req, client, ClientStore) => {
    try {

        User.findOne({ token: req.token })
        .select('_id name username token avatar') 
        .exec(function (fail, success) {
            if (success) {
                ClientStore.add(client.id, {
                    _id: success._id,
                    name: success.name,
                    username: success.username,
                    token: success.token
                });
                client.emit('authenticate', {
                    status: 200,
                    _id: success._id,
                    name: success.name,
                    username: success.username,
                    token: success.token,
                    avatar: success.avatar
                }, null);
            }

            if (fail) {
                // TODO handle 401
            }
        });
    }catch(e){
        client.emit('authenticate', null , {
            status: 500,
            message: e
        });     
    }
};


module.exports = {
    authorize
};
