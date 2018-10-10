const mongoose = require('mongoose');
const redis = require('../utils/redis');
const logger = require('../utils/logger');

const loggerDispatcher = 'RoomModel';
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  user: {
    type: String
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  user_count: {
    type: Number
  },
});

roomSchema.statics.getAll = async function roomGetAll() {
  let data;

  try {
    data = await redis.getAsync('rooms');
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'roomGetAll' });
  }

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  try {
    redis.client.set('rooms', JSON.stringify(data), 'EX', 60);
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'roomGetAll' });
  }

  return data;
};

const Room = mongoose.model('Room', roomSchema, 'rooms');

module.exports = Room;
