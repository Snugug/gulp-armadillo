import test from 'ava';
import {fromString, fromPath} from '../helpers/pipe';
import plugin from '../helpers/plugin';
import nunjucks from '../../lib/plugins/nunjucks';

test('Compiles Nunjucks - basic string', t => {
  const input = `<h1>Hello World</h1>`;
  const expected = '<h1>Hello World</h1>';

  return fromString(input, 'pages/hello.html', nunjucks)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Nunjucks compiles as expected');
    });
});

test('Compiles Nunjucks - extend', t => {
  const input = `tests/fixtures/pages/nunjucks.html`;
  const expected = '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>TEST FIXTURE</title>\n</head>\n<body>\n  \n<h1>Hello World! Compiling from Nunjucks</h1>\n\n</body>\n</html>\n';

  return fromPath(input, nunjucks)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Nunjucks compiles as expected');
    });
});

plugin(nunjucks, test);
