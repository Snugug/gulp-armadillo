'use strict';

const sequence = require('run-sequence');

const build = (config, cb) => {
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

  return seq;
}

// Ignoring as Run Sequence requires active Gulp tasks and we don't have those available in tests
/* istanbul ignore next */
module.exports = function(config, cb) {
  const seq = build(config, cb);

  return sequence.apply(this, seq);
}

module.exports.build = build;
