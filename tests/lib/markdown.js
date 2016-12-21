import test from 'ava';
import md from '../../lib/helpers/markdown';

// Prism Rendering
test('Prism - Renders Known Language', t => {
  const sample = '```scss\n$foo: red;\n\nbody {\n  background: $foo;\n}\n';
  const output = md.render(sample);
  const expected = `<pre class=\"language-scss\"><code class=\"language-scss\"><span class=\"token property\"><span class=\"token variable\">$foo</span></span><span class=\"token punctuation\">:</span> red<span class=\"token punctuation\">;</span>\n\n<span class=\"token selector\">body </span><span class=\"token punctuation\">{</span>\n  <span class=\"token property\">background</span><span class=\"token punctuation\">:</span> <span class=\"token variable\">$foo</span><span class=\"token punctuation\">;</span>\n<span class=\"token punctuation\">}</span>\n</code></pre>\n`;

  t.is(output, expected, 'Prism renders the Sass as expected');
});

test('Prism - Renders Unknown Language', t => {
  const sample = '```foobar\n$foo: red;\n\nbody {\n  background: $foo;\n}\n';
  const output = md.render(sample);
  const expected = `<pre class=\"language-foobar\"><code class=\"language-foobar\">$foo: red;\n\nbody {\n  background: $foo;\n}\n</code></pre>\n`;

  t.is(output, expected, 'Prism return input');
});


// Video Plugin
test('Video Plugin - Incomplete Video Object', t => {
  const sample = '@[';
  const output = md.render(sample);
  const expected = `<p>@[</p>\n`;

  t.is(output, expected, 'Incomplete video object not rendered');
});

test('Video Plugin - Not Video Object', t => {
  const sample = '@snugug';
  const output = md.render(sample);
  const expected = `<p>@snugug</p>\n`;

  t.is(output, expected, 'Video-like object not converted');
});

test('Video Plugin - Broken Parens', t => {
  const sample = '@[/videos/foo.webm]( foo [hello](https://snugug.com)';
  const output = md.render(sample);
  const expected = `<p>@[/videos/foo.webm]( foo @[/videos/foo.webm]( foo </p>\n`;

  t.is(output, expected, 'Video-like object not converted');
});

test('Video Plugin - Empty href', t => {
  const sample = '@[/videos/foo.webm]()';
  const output = md.render(sample);
  const expected = `<p><video src=\"/videos/foo.webm\" type=\"video/webm\" controls><a href=\"/videos/foo.webm\">/videos/foo.webm</a></video></p>\n`;

  t.is(output, expected, 'Video-like object not converted');
});

test('Video Plugin - Missing href', t => {
  const sample = '@[/videos/foo.webm]';
  const output = md.render(sample);
  const expected = `<p><video src=\"/videos/foo.webm\" type=\"video/webm\" controls><a href=\"/videos/foo.webm\">/videos/foo.webm</a></video></p>\n`;

  t.is(output, expected, 'Video-like object not converted');
});

test('Video Plugin - Renders inline', t => {
  const sample = '@[Hello World](/videos/foo.webm)';
  const output = md.render(sample);
  const expected = `<p><video src="/videos/foo.webm" type="video/webm" controls><a href="/videos/foo.webm">Hello World</a></video></p>\n`;

  t.is(output, expected, 'HTML5 Video');
});

test('Video Plugin - Renders YouTube', t => {
  const sample = '@[Taylor Swift - Shake it Off](https://www.youtube.com/watch?v=nfWlot6h_JM)';
  const output = md.render(sample);
  const expected = `<p><div class=\"flexible-video\"><iframe  src=\"https://www.youtube.com/embed/nfWlot6h_JM\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe></div></p>\n`;

  t.is(output, expected, 'YouTube Embed');
});

test('Video Plugin - Renders YouTube, no label', t => {
  const sample = '@[https://www.youtube.com/watch?v=nfWlot6h_JM]';
  const output = md.render(sample);
  const expected = `<p><div class=\"flexible-video\"><iframe  src=\"https://www.youtube.com/embed/nfWlot6h_JM\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe></div></p>\n`;

  t.is(output, expected, 'YouTube Embed');
});

test('Video Plugin - Renders Vimeo', t => {
  const sample = '@[Metropolis - A New York City Timelapse](https://vimeo.com/30316012)';
  const output = md.render(sample);
  const expected = `<p><div class=\"flexible-video\"><iframe  src=\"//player.vimeo.com/video/30316012\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe></div></p>\n`;

  t.is(output, expected, 'Vimeo Embed');
});
