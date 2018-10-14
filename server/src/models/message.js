const mongoose = require('mongoose');
const logger = require('../utils/logger');

const loggerDispatcher = 'MessageModel';
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  },
  text: {
    type: String,
  },
  image: {
    type: String
  },
  date: {
    type: Number
  }
});

messageSchema.statics.getAll = async function messageGetAll() {
  let data;

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  return data;
};

const Message = mongoose.model('Message', messageSchema, 'messages');

module.exports = Message;
