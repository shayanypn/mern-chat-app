const mongoose = require('mongoose');
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

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  return data;
};

const Channel = mongoose.model('Channel', channelSchema, 'channels');

module.exports = Channel;
