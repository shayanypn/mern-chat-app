const User = require('../models/user');
const ClientStore = require('./client');


const authorize = (req, client) => {
    try {
        User.findOne({ token: req.token })
        .select('name token username')
        .exec(function (fail, success) {
            
            if (fail) {
                // TODO handle 401
            }
            
            if (success) {
                ClientStore.add(client.id, req);
                client.emit('authenticate', {
                    status: 200
                }, null);
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
