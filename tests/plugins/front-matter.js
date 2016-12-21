import test from 'ava';
import {fromString, fromNull, fromStream} from '../helpers/pipe';
import fm from '../../lib/plugins/front-matter';

test('No Compile - null', t => {
  return fromNull(fm)
    .then(output => {
      t.is(output, '', 'No output');
    });
});

test('Error - is stream', t => {
  t.throws(fromStream(fm));
});
