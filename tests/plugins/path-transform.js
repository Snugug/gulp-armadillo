import test from 'ava';
import { fromString } from '../helpers/pipe';
import plugin from '../helpers/plugin';
import path from '../../lib/plugins/path-transform';

test('Is an index file', t => {
  return fromString('hello', 'markdown/index.html', path)
    .then(output => {
      t.is(output.path, 'markdown/index.html', 'No change');
    });
});

test('Is not an index file', t => {
  return fromString('hello', 'markdown/bar.html', path)
    .then(output => {
      t.is(output.path, 'markdown/bar/index.html', 'Changed to index file');
    });
});

plugin(path, test);
