'use strict'

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env')

const Url = require('url-parse')
const REDIS_URL = new Url(Env.get('REDIS_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: Env.get('REDIS_CONNECTION', 'local'),

  /*
  |--------------------------------------------------------------------------
  | local connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  local: {
    host: '127.0.0.1',
    port: 6379,
    password: null,
    db: 0,
    keyPrefix: ''
  },

  /*
  |--------------------------------------------------------------------------
  | heroku connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  heroku: {
    host: Env.get('REDIS_HOST', REDIS_URL.hostname),
    port: Env.get('REDIS_PORT', REDIS_URL.port),
    user: Env.get('REDIS_USER', REDIS_URL.username),
    password: Env.get('REDIS_PASSWORD', REDIS_URL.password),
    db: 0,
    keyPrefix: ''
  },

  /*
  |--------------------------------------------------------------------------
  | cluster config
  |--------------------------------------------------------------------------
  |
  | Below is the configuration for the redis cluster.
  |
  */
  cluster: {
    clusters: [
      {
        host: '127.0.0.1',
        port: 6379,
        password: null,
        db: 0
      },
      {
        host: '127.0.0.1',
        port: 6380,
        password: null,
        db: 0
      }
    ]
  }
}
