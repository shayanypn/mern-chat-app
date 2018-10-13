const mongoose = require('mongoose');
const redis = require('../utils/redis');
const logger = require('../utils/logger');

const loggerDispatcher = 'UserModel';
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String
  },
  expireAt: {
    type: Date
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }]
});

userSchema.statics.getAll = async function userGetAll() {
  let data;

  try {
    data = await redis.getAsync('User');
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'userGetAll' });
  }

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  try {
    redis.client.set('User', JSON.stringify(data), 'EX', 60);
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'userGetAll' });
  }

  return data;
};

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
