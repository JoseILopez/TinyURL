const constants = {

  // Database connection

  DB: {
    URL: 'mongodb://localhost:27017/tinyurl',
    NAME: 'tinyurls',
  },

  // Frontend

  FRONTEND_URL: 'http://localhost:3000/',

  // Default document

  DEFAULT: {
    URL: 'wizeline.com',
    SHORT_NAME: 'wize',
    HTTPS: false,
  },

  // Pretty printing of ipv6 address

  IPV4: {
    '::1': '127.0.0.1',
  },

  // HTTP status codes

  STATUS: {
    BAD_REQUEST: 400,
    OK: 200,
    NOTFOUND: 404,

  },

  // Server

  SERVER_PORT: 5000,
};

module.exports = constants;
