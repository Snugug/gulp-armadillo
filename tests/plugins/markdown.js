import test from 'ava';
import {fromString} from '../helpers/pipe';
import markdown from '../../lib/plugins/markdown';

test('Compiles Markdown - .md', t => {
  const input = '# Hello World';
  const expected = '<h1>Hello World</h1>\n';

  return fromString(input, 'markdown/hello.md', markdown)
    .then(output => {
      t.is(output, expected, 'Markdown compiles as expected');
    });
});

test('Compiles Markdown - .markdown', t => {
  const input = '# Hello World';
  const expected = '<h1>Hello World</h1>\n';

  return fromString(input, 'markdown/hello.markdown', markdown)
    .then(output => {
      t.is(output, expected, 'Markdown compiles as expected');
    });
});

test('No Compile - .html', t => {
  const input = '# Hello World';
  const expected = '# Hello World';

  return fromString(input, 'markdown/hello.html', markdown)
    .then(output => {
      t.is(output, expected, 'Markdown compiles as expected');
    });
});
