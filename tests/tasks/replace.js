import test from 'ava';
import { fromString } from '../helpers/pipe';

import replace from '../../lib/tasks/replace';

test('Replaces - Base', t => {
  const input = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Hello World</title><base href="/"></head><body></body></html>';
  const expected = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Hello World</title><base href="https://snugug.github.io/gulp-armadillo/"></head><body></body></html>';

  return fromString(input, 'replace/hello.html', replace.base)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Replaces <base> as expected');
    });
});
