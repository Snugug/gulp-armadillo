'use strict';

const sequence = require('run-sequence');

module.exports = function(config, cb) {
  let seq = [];

  if (Array.isArray(config)) {
    seq = config;
  }
  else {
    Object.keys(config).forEach(function (task) {
      seq.push(config[task]);
    });
  }

  seq.push(cb);

  return sequence.apply(this, seq);
}
