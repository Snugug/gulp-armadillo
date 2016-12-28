'use strict';

const pipe = require('./pipe');

module.exports = (plugin, test) => {
  test('No Compile - null', t => {
    return pipe.fromNull(plugin)
      .then(output => {
        t.is(output, '', 'No output');
      });
  });

  test('Error - is stream', t => {
    t.throws(pipe.fromStream(plugin));
  });
};
