const User = require('../models/user');


const authorize = (req, client, ClientStore) => {
    try {
        User.findOne({ token: req.token })
        .select('_id name token username')
        .exec(function (fail, success) {
            if (success) {
                ClientStore.add(client.id, {
                    name: success.name,
                    token: success.token,
                    username: success.username,
                    _id: success._id
                });
                client.emit('authenticate', {
                    status: 200
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
