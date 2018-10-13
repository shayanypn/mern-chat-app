const mongoose = require('mongoose');
const redis = require('../utils/redis');
const logger = require('../utils/logger');

const loggerDispatcher = 'RoomModel';
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  user_count: {
    type: Number
  },
});

roomSchema.statics.getAll = async function roomGetAll() {
  let data;

  try {
    data = await redis.getAsync('Room');
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'roomGetAll' });
  }

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  try {
    redis.client.set('Room', JSON.stringify(data), 'EX', 60);
  } catch (err) {
    logger.error(err, { dispatcher: loggerDispatcher, from: 'roomGetAll' });
  }

  return data;
};

const Room = mongoose.model('Room', roomSchema, 'Room');

module.exports = Room;
