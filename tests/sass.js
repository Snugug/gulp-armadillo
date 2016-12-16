import test from 'ava';
import {fromString, fromPath} from './helpers/pipe';

import sass from '../lib/tasks/sass';


test('Compiles', t => {
  const input = '$foo: red; body { background: $foo; }';
  const expected = 'body{background:red}\n\n/*# sourceMappingURL=../maps/sass/style.css.map */\n';

  return fromString(input, 'sass/style.scss', sass)
    .then(output => {
      t.is(output, expected, 'Sass compiled as expected');
    });
});

test('Prefixes', t => {
  const input = 'body { appearance: button; }';
  const expected = 'body{-webkit-appearance:button;-moz-appearance:button;appearance:button}\n\n/*# sourceMappingURL=../maps/sass/style.css.map */\n';

  return fromString(input, 'sass/style.scss', sass)
    .then(output => {
      t.is(output, expected, 'Sass compiled as expected');
    });
});

test('Eyeglass Modules', t => {
  const input = '@import "breakpoint"; body { @include mq(500px) { background: red; }}';
  const expected = '@media (min-width: 500px){body{background:red}}\n\n/*# sourceMappingURL=../maps/sass/style.css.map */\n';

  return fromString(input, 'sass/style.scss', sass)
    .then(output => {
      t.is(output, expected, 'Eyeglass module ');
    });
});

test('Import Once', t => {
  const input = './tests/fixtures/sass/test.scss';
  const expected = 'body{background:red}body{background:blue}\n\n/*# sourceMappingURL=maps/test.css.map */\n';

  return fromPath(input, sass)
    .then(output => {
      t.is(output, expected, 'Sass compiled as expected');
    });
});
