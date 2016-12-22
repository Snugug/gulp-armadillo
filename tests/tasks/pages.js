import test from 'ava';
import {fromString, fromPath} from '../helpers/pipe';

import pages from '../../lib/tasks/pages';

test('Compiles - HTML with front matter', t => {
  const input = `---
content: Hello World
---
<h1>{{content}}</h1>`;
  const expected = '<h1>Hello World</h1>';

  return fromString(input, 'pages/hello.html', pages.compile)
    .then(output => {
      t.is(output.contents.toString(), expected, 'HTML Pages compiled as expected');
    });
});

test('Compiles - Markdown with front matter', t => {
  const input = `---
content: Hello World
---
# {{content}}`;
  const expected = '<h1>Hello World</h1>\n';

  return fromString(input, 'pages/hello.md', pages.compile)
    .then(output => {
      t.is(output.contents.toString(), expected, 'HTML Pages compiled as expected');
    });
});

test('Compiles - template in front matter', t => {
  const input = 'tests/fixtures/pages/pages.html';
  const expected = '<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>TEST FIXTURE</title>\n</head>\n<body>\n  <h1>Hello World! I&#39;ve got front matter!</h1>\n\n</body>\n</html>\n';

  return fromPath(input, pages.compile)
    .then(output => {
      t.is(output.contents.toString(), expected, 'HTML Pages compiled as expected');
    });
});
