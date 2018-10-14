const User = require('../models/user');
const Validation = require('../validations/user');
const Authorization = require('../validations/authorization');


const getOne = async (req, res) => {

    const { headers } = req;
    const validate = await Validation.getById(req);
    if (validate !== true) {
        return res.status(validate.status).send(validate);
    }

    const user = await User.findOne({ token: headers.authorization })
        .select('_id name username')
        .exec(function (err, result) {
            return result;
        });

    if (user === null) {
        return res.status(404).send({
            message: 'resource not found'
        });
    }

    res.status(200).send({
        id: user._id,
        name: user.name,
        username: user.username,        
    });
};


const updateOne = async (req, res) => {

    const { headers, body } = req;
    const validate = await Validation.updateOne(req);
    if (validate !== true) {
        return res.status(validate.status).send(validate);
    }

    const user = await User.findOne({ token: headers.authorization })
        .select('_id')
        .exec(function (err, result) {
            return result;
        });

    if (user === null) {
        return res.status(404).send({
            message: 'resource not found'
        });
    }


    await User.findByIdAndUpdate(
        user._id,
        {$set:{name: body.name}},
        {new: true},
        function(err, result){
            if(err){
                //  TODO
            }
    });

    res.status(200).send({
        status: 'ok'
    });
};

const updateAvatar  = async (req, res) => {

    const { headers, body } = req;
    const validate = await Validation.updateAvatar(req);
    if (validate !== true) {
        return res.status(validate.status).send(validate);
    }

    const user = await User.findOne({ token: headers.authorization })
        .select('_id')
        .exec(function (err, result) {
            return result;
        });

    if (user === null) {
        return res.status(404).send({
            message: 'resource not found'
        });
    }


    await User.findByIdAndUpdate(
        user._id,
        {$set:{avatar: body.avatar}},
        {new: true},
        function(err, result){
            if(err){
                //  TODO
            }
    });

    res.status(200).send({
        status: 'ok'
    });
};


module.exports = {
    getOne,
    updateOne,
    updateAvatar,
};
