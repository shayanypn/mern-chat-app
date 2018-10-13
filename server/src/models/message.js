const mongoose = require('mongoose');
const redis = require('../utils/redis');
const logger = require('../utils/logger');

const loggerDispatcher = 'MessageModel';
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  user: {
    type: String
  },
  room: {
    type: String
  },
  channel: {
    type: String
  },
  text: {
    type: String,
  }
});

messageSchema.statics.getAll = async function messageGetAll() {
  let data;

  try {
    data = await redis.getAsync('messages');
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'messageGetAll' });
  }

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  try {
    redis.client.set('messages', JSON.stringify(data), 'EX', 60);
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'messageGetAll' });
  }

  return data;
};

const Message = mongoose.model('Message', messageSchema, 'messages');

module.exports = Message;
