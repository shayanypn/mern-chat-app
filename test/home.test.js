const { DB_PROTOCOL, DB_HOST, DB_PORT, DB_NAME } = require('../src/app/config');
const test = require('tape');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app/app');

const request = supertest(app);
const databasePrefixName = 'test';
const databaseUrl = `${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${databasePrefixName}_${DB_NAME}`;
let databaseConnected = false;
let user = null;

process.env.DB_NAME = 'restapi';


test('Connect to database', t => {
  mongoose
    .connect(databaseUrl)
    .then(() => {
      databaseConnected = true;
      t.pass('connected');
      t.comment('Drop database');
      return mongoose.connection.db.dropDatabase();
    })
    .then(() => {
      t.pass('dropped');
      t.end();
    })
    .catch(err => {
      t.error(err, 'Error');
      t.end();
    });
});

test('Insert user - POST /signup', t => {
  if (databaseConnected === false) {
    t.fail('Database not connected');
    t.end();
  } else {
    const expected = {
      name:     'jdoe',
      username: 'jdoe@gmail.com'
    };

    request
      .post('/signup')
      .send({
        username: 'jdoe@gmail.com',
        password: '123123'
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        t.pass('inserted');
        user = res.body.data;
        const actual = {
          name: res.body.data.name,
          username: res.body.data.username
        };
        t.deepEqual(actual, expected, 'they are equal');
        t.end();
      })
      .catch(err => {
        t.error(err, 'error');
        t.end();
      });
  }
});