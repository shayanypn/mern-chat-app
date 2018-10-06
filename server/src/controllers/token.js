const User = require('../models/user');
const Validation = require('../validations/token');
const rand = () => {
    return Math.random().toString(36).substr(2);
};


const getByToken = async (req, res) => {
    const { params } = req;
    const validate = await Validation.getByToken(req);

    if (validate !== true) {
        return res.status(validate.status).send(validate);
    }

    const user = await User.findOne({ token: params.token })
        .select('name token')
        .exec(function (err, result) {
            return result;
        });

    if (user === null ) {
        res.status(401).send({
            message: 'authorization problem'
        });
    }else{
        res.status(200).send({
            status: 'ok'
        });
    }
};

const create = async (req, res) => {

    const { body } = req;
    const validate = await Validation.create(req);

    if (validate !== true) {
        return res.status(validate.status).send(validate);
    }

    await User.findOneAndUpdate(
        {username: body.username},
        {$set:{token: rand()+rand()}},
        {new: true},
        function(err, result){
            if(err){
                //  TODO
            }
    });
    const user = await User.findOne({ username: body.username })
        .select('name token')
        .exec(function (err, result) {
            return result;
        });

    res.status(201).send({
        token: user.token
    });
};

const deleteByToken = async (req, res) => {
    const { params } = req;
    const validate = await Validation.getByToken(req);

    if (validate !== true) {
        return res.status(validate.status).send(validate);
    }

    const user = await User.findOne({ token: params.token })
        .select('_id name token')
        .exec(function (err, result) {
            return result;
        });

    if (user === null ) {
        res.status(404).send({
            message: 'token not found'
        });
    } else {
        await User.findOneAndUpdate(
            {_id: user._id},
            {$set:{token: ''}},
            function(err, result){
                if(err){
                    //  TODO
                }
        });
        res.status(204).send();
    }

};

module.exports = {
    getByToken,
    create,
    deleteByToken,
};