const mongoose = require('mongoose');
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
  avatar: {
    type: String
  }
});

roomSchema.statics.getAll = async function roomGetAll() {
  let data;

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  return data;
};

const Room = mongoose.model('Room', roomSchema, 'rooms');

module.exports = Room;
