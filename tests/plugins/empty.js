import test from 'ava';
import { fromString } from '../helpers/pipe';
import plugin from '../helpers/plugin';
import empty from '../../lib/plugins/empty';

test.skip('No error on full file', t => { // eslint-disable-line ava/no-skip-test
  t.notThrows(fromString('Test', 'pages/empty', empty));
});

test.skip('Errors out on empty file', t => { // eslint-disable-line ava/no-skip-test
  t.throws(fromString('', 'pages/empty', empty));
});

plugin(empty, test);
