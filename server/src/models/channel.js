const mongoose = require('mongoose');
const redis = require('../utils/redis');
const logger = require('../utils/logger');

const loggerDispatcher = 'ChannelModel';
const Schema = mongoose.Schema;

const channelSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
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

channelSchema.statics.getAll = async function channelGetAll() {
  let data;

  try {
    data = await redis.getAsync('Channel');
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'channelGetAll' });
  }

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  try {
    redis.client.set('Channel', JSON.stringify(data), 'EX', 60);
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'channelGetAll' });
  }

  return data;
};

const Channel = mongoose.model('Channel', channelSchema, 'Channel');

module.exports = Channel;
