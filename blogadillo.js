'use strict';

module.exports = function (gulp) {
  require('./index.js')(gulp, {
    'pages': {
      'transformURL': true,
      'sort': 'created'
    }
  });
}