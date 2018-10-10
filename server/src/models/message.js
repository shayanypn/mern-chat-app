const mongoose = require('mongoose');
const redis = require('../utils/redis');
const logger = require('../utils/logger');

const loggerDispatcher = 'MessageModel';
const Schema = mongoose.Schema;

const messaeSchema = new mongoose.Schema({
  user: {
    type: String
  },
  room: {
    type: String
  },
  channel: {
    type: String
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  userCount: {
    type: Number
  },
  isPrivate: {
    type: Boolean
  },
});

messaeSchema.statics.getAll = async function messageGetAll() {
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

const Message = mongoose.model('Message', messaeSchema, 'messages');

module.exports = Message;
