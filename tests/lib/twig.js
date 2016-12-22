import test from 'ava';
import twig from '../../lib/helpers/twig';

function twigTest(t, data, expected) {
  const input = twig({
    data,
  });
  const output = input.render();

  t.is(output, expected);
}

// Markdown Filter
test('Markdown filter', twigTest, '{{ "# Hello World" | markdown }}', '<h1>Hello World</h1>\n');

// Render Filter
test('Render filter - external markdown with front matter', twigTest, '{{ "tests/fixtures/pages/hello.md" | render }}', '<h1>Hello World</h1>\n<p>This is sample Markdown</p>\n<ul>\n<li>Written by Sam</li>\n</ul>\n');

test('Render filter - external HTML without front matter', twigTest, '{{ "tests/fixtures/pages/world.html" | render }}', '<h2>The world, beautiful</h2>\n');

// Attributes Filter
test('Attribute filter - all', twigTest, '{% set obj = "tests/fixtures/pages/hello.md" | attributes %}{% for key, value in obj %}<p>{{key}}: {{value}}</p>{% endfor %}', '<p>title: Hello World</p><p>author: Sam</p>');
test('Attribute filter - one', twigTest, '{{ "tests/fixtures/pages/hello.md" | attributes("author") }}', 'Sam');
test('Attribute filter - none', twigTest, '{% set obj = "tests/fixtures/pages/world.html" | attributes %}{% for key, value in obj %}<p>{{key}}: {{value}}</p>{% endfor %}', '');

// Body Filter
test('Attribute filter - markdown', twigTest, '{{ "tests/fixtures/pages/hello.md" | body }}', '# {{title}}\n\nThis is sample Markdown\n\n* Written by {{author}}\n');
test('Attribute filter - markdown', twigTest, '{{ "tests/fixtures/pages/world.html" | body }}', '<h2>The world, beautiful</h2>\n');
