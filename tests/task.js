import test from 'ava';
import {dest} from '../lib/helpers/task';

const DEST = process.env.DEST;

test.serial('Default Destination', t => {
  const input = '/foo/bar';
  const output = dest(input);
  const expected = '.www/foo/bar';

  t.is(output, expected);
});

test.serial('Specified Destination', t => {
  process.env.DEST = 'dist'
  const input = '/foo/bar';
  const output = dest(input);
  const expected = '.dist/foo/bar';

  t.is(output, expected);
});

test.afterEach.always('Reset Env Vars', t => {
  if (DEST === undefined)  {
    delete process.env.DEST;
  }
  else {
    process.env.DEST = DEST;
  }
});
