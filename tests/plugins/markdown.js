import test from 'ava';
import {fromString, fromNull, fromStream} from '../helpers/pipe';
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

test('Compiles Markdown with Custom Plugin', t => {
  const input = '@[Taylor Swift - Shake it Off](https://www.youtube.com/watch?v=nfWlot6h_JM)';
  const expected = `<p><div class=\"flexible-video\"><iframe  src=\"https://www.youtube.com/embed/nfWlot6h_JM\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe></div></p>\n`;

  return fromString(input, 'shake/it/off.md', markdown)
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

test('No Compile - null', t => {
  return fromNull(markdown)
    .then(output => {
      t.is(output, '', 'No output');
    });
});

test('Error - is stream', t => {
  t.throws(fromStream(markdown));
});
