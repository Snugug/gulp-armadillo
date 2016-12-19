'use strict';

const config = require('config');

module.exports = function failOnError(name) {
  return function(error) {
    if (config.failOnError) {
      throw new Error(error);
    }
    else {
      process.stderr.write(error + '\n');
      this.emit('end');
    }
  }
}
