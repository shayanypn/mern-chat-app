const User = require('../models/user');
const ClientStore = require('./client');


const search = (req, client) => {

    try {
        const data = JSON.parse(req);

        User.findOne({ token: data.token })
        .select('name token username')
        .exec(function (fail, success) {
            
            if (fail) {
                // TODO handle 401
            }
            
            if (success) {
                ClientStore.add(client.id, data);
                client.emit('authenticate', null, 'SUCCESS' );
            }

            client.emit('authenticate', 'NORESULT', null );
        });
    }catch(e){
        client.emit('authenticate', 'Invalid Params' , null );        
    }
};


module.exports = {
    search
};
