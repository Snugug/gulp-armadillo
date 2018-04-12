import test from 'ava';
import { fromString } from '../helpers/pipe';
import plugin from '../helpers/plugin';
import markdown from '../../lib/plugins/markdown';

test('Compiles Markdown - .md', t => {
  const input = '# Hello World';
  const expected = '<h1>Hello World</h1>\n';

  return fromString(input, 'markdown/hello.md', markdown)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Markdown compiles as expected');
    });
});

test('Compiles Markdown - .markdown', t => {
  const input = '# Hello World';
  const expected = '<h1>Hello World</h1>\n';

  return fromString(input, 'markdown/hello.markdown', markdown)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Markdown compiles as expected');
    });
});

test('Compiles Markdown with Custom Plugin', t => {
  const input = '@[https://www.youtube.com/watch?v=nfWlot6h_JM]';
  const expected = '<p><div class="flexible-video"><iframe  src="https://www.youtube.com/embed/nfWlot6h_JM" width="560" height="315" frameborder="0" allowfullscreen></iframe></div></p>\n';

  return fromString(input, 'shake/it/off.md', markdown)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Markdown compiles as expected');
    });
});

test('Compiles Markdown with Prism', t => {
  const input = `\`\`\`scss
.body {
  $color: red;
  background: $color
}
\`\`\``;
  const expected = `<pre class="language-scss"><code class="language-scss"><span class="token selector">.body </span><span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token variable">$color</span>
<span class="token punctuation">}</span>
</code></pre>
`;

  return fromString(input, 'does/it/prism.md', markdown)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Markdown compiles as expected');
    });
});

test('No Compile - .html', t => {
  const input = '# Hello World';
  const expected = '# Hello World';

  return fromString(input, 'markdown/hello.html', markdown)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Markdown compiles as expected');
    });
});

plugin(markdown, test);
