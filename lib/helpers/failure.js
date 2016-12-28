'use strict';

module.exports = function () {
  let fail = false;

  if (process.env.hasOwnProperty('FAIL_ON_ERROR')) {
    if (process.env.FAIL_ON_ERROR === 'true') {
      fail = true;
    }
  }
  else if (process.env.CI === 'true') {
    fail = true;
  }

  return function (error) {
    if (fail) {
      throw new Error(error);
    }
    else {
      process.stderr.write(`${error}\n`);
      this.emit('end'); // eslint-disable-line no-invalid-this
    }
  };
};
