const mongoose = require('mongoose');
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
  avatar: {
    type: String
  }
});

userSchema.statics.getAll = async function userGetAll() {
  let data;

  if (data) return JSON.parse(data);
  data = await this.find().exec();

  return data;
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
