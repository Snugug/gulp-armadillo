import test from 'ava';
import nunjucks from '../../lib/helpers/nunjucks';
import dateformat from 'dateformat';

const today = Date.now();
const todayFormatted = dateformat(today, 'mm-dd-yyyy');
const todayDefault = dateformat(today, 'ddd mmm dd yyyy');

function nunjucksTest(t, data, expected) {
  const output = nunjucks.renderString(data);

  t.is(output, expected);
}

// Markdown Filter
test('Markdown filter', nunjucksTest, '{{ "# Hello World" | markdown }}', '<h1>Hello World</h1>\n');

// Render Filter
test('Render filter - external markdown with front matter', nunjucksTest, '{{ "tests/fixtures/pages/hello.md" | render }}', '<h1>Hello World</h1>\n<p>This is sample Markdown</p>\n<ul>\n<li>Written by Sam</li>\n</ul>\n');

test('Render filter - external HTML without front matter', nunjucksTest, '{{ "tests/fixtures/pages/world.html" | render }}', '<h2>The world, beautiful</h2>\n');

// Attributes Filter
test('Attribute filter - all', nunjucksTest, '{% set obj = "tests/fixtures/pages/hello.md" | attributes %}{% for key, value in obj %}<p>{{key}}: {{value}}</p>{% endfor %}', '<p>title: Hello World</p><p>author: Sam</p>');
test('Attribute filter - one', nunjucksTest, '{{ "tests/fixtures/pages/hello.md" | attributes("author") }}', 'Sam');
test('Attribute filter - none', nunjucksTest, '{% set obj = "tests/fixtures/pages/world.html" | attributes %}{% for key, value in obj %}<p>{{key}}: {{value}}</p>{% endfor %}', '');

// Body Filter
test('Attribute filter - markdown', nunjucksTest, '{{ "tests/fixtures/pages/hello.md" | body }}', '# {{title}}\n\nThis is sample Markdown\n\n* Written by {{author}}\n');
test('Attribute filter - html', nunjucksTest, '{{ "tests/fixtures/pages/world.html" | body }}', '<h2>The world, beautiful</h2>\n');

// Date Filter
test('Date filter - value', nunjucksTest, `{{ ${today} | date("mm-dd-yyyy") }}`, todayFormatted);
test('Date filter - now', nunjucksTest, '{{ "now" | date("mm-dd-yyyy") }}', todayFormatted);
test('Date filter - default', t => {
  const data = '{{ "now" | date }}';
  const output = nunjucks.renderString(data);

  t.true(output.indexOf(todayDefault) === 0, 'Contains the full default date');
});
