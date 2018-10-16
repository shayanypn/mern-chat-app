require('dotenv').config();

const DB_PROTOCOL = process.env.DB_PROTOCOL || 'mongodb';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'mern-chat-app';
const DB_USERNAME = process.env.DB_USERNAME || null;
const DB_PASSWORD = process.env.DB_PASSWORD || null;

/* eslint-disable no-trailing-spaces */
const config = {
  /* ENV */
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  isProd: process.env.NODE_ENV === 'production',

  /* SERVER */
  PORT: parseInt(process.env.PORT, 10) || 3000,

  /* DB */
  DB_PROTOCOL,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_URL: `${DB_PROTOCOL}://${DB_USERNAME ? (DB_USERNAME+':'+DB_PASSWORD+'@') : ''}${DB_HOST}:${DB_PORT}/${DB_NAME}?connect=replicaSet`,

  /* REDIS */
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,

  /* LOG */
  LOG_LEVEL: process.env.LOG_LEVEL || 'verbose',
  LOG_TO_FILE: true,
};

module.exports = config;
