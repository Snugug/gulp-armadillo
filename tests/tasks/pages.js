import test from 'ava';
import { fromString, fromPath } from '../helpers/pipe';

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

test('Compiles - HTML with listing', t => {
  const input = `---
listing:
  folders:
    - ../tests/fixtures/listing
---
{% for key, items in listing %}
{% for item in items %}
{{item.path}}
{% endfor %}
{% endfor %}`;
  const expected = '\n\nests/fixtures/listing/bar/index.html\n\nests/fixtures/listing/baz/waldo/index.html\n\nests/fixtures/listing/baz/where/index.html\n\nests/fixtures/listing/foo/index.html\n\nests/fixtures/listing/qux/batman/index.html\n\nests/fixtures/listing/qux/robin/index.html\n\n';

  return fromString(input, 'pages/listing.html', pages.compile)
    .then(output => {
      t.is(output.contents.toString(), expected, 'HTML Pages compiled with listing as expected');
    });
});

test('Compiles - template in front matter', t => {
  const input = 'tests/fixtures/pages/pages.html';
  const expected = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>TEST FIXTURE</title>\n</head>\n<body>\n  <h1>Hello World! I&#39;ve got front matter!</h1>\n\n</body>\n</html>\n';

  return fromPath(input, pages.compile)
    .then(output => {
      t.is(output.contents.toString(), expected, 'HTML Pages compiled as expected');
    });
});
