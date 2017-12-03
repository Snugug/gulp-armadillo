'use strict';

const pipe = require('./pipe');

module.exports = (plugin, test) => {
  test('No Compile - null', t => {
    return pipe.fromNull(plugin)
      .then(output => {
        t.is(output, '', 'No output');
      });
  });

  test.skip('Error - is stream', t => { // eslint-disable-line ava/no-skip-test
    t.throws(pipe.fromStream(plugin));
  });
};
