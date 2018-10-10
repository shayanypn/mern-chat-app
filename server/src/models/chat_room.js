const mongoose = require('mongoose');
const redis = require('../utils/redis');
const logger = require('../utils/logger');

const loggerDispatcher = 'ChatRoomModel';
const Schema = mongoose.Schema;

const chatRoomSchema = new mongoose.Schema({
  adminUser: {
    type: String
  },
  joinedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
  },
  Description: {
    type: String,
  },
  isPrivate: {
    type: Boolean
  },
  userCount: {
    type: Number
  },
});

chatRoomSchema.statics.getAll = async function chatRoomGetAll() {
  let data;

  try {
    data = await redis.getAsync('chatrooms');
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'userGetAll' });
  }

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  try {
    redis.client.set('chatrooms', JSON.stringify(data), 'EX', 60);
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'userGetAll' });
  }

  return data;
};

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema, 'chatrooms');

module.exports = ChatRoom;
