import test from 'ava';
import { dest } from '../../lib/helpers/task';

const DEST = process.env.DEST;

test.serial('Default Destination', t => {
  const input = '/foo/bar';
  const output = dest(input);
  const expected = '.www/foo/bar';

  t.is(output, expected);
});

test.serial('Specified Destination', t => {
  process.env.DEST = 'fixtures';
  const input = '/foo/bar';
  const output = dest(input);
  const expected = 'tests/fixtures/foo/bar';

  t.is(output, expected);
});

test.afterEach.always('Reset Env Vars', () => {
  if (DEST === undefined) {
    delete process.env.DEST;
  }
  else {
    process.env.DEST = DEST;
  }
});
