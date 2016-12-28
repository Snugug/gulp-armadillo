import test from 'ava';
import { fromString } from '../helpers/pipe';
import plugin from '../helpers/plugin';
import empty from '../../lib/plugins/empty';

test('No error on full file', t => {
  t.notThrows(fromString('Test', 'pages/empty', empty));
});

test('Errors out on empty file', t => {
  t.throws(fromString('', 'pages/empty', empty));
});

plugin(empty, test);
