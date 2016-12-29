import test from 'ava';
import defaultConfig from '../config/default';
import indexConfig from '../config';

test('Index is Syntactic Sugar', t => {
  t.deepEqual(indexConfig, defaultConfig, 'Index exports default');
});
