'use strict';

module.exports = function (gulp) {
  require('./index.js')(gulp, {
    'pages': {
      'dir': 'pages',
      'transformURL': true,
      'sort': 'created',
      'reverse': true
    }
  });
}
