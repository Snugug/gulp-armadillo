import test from 'ava';
import { fromString } from '../helpers/pipe';
import plugin from '../helpers/plugin';
import fm from '../../lib/plugins/front-matter';

test('Extracts Front Matter', t => {
  const input = `---
foo: bar
baz:
  - qux
  - where
  - waldo
more:
  good:
    stuff:
      - lives: here
      - and: here
---
# Hello World`;
  const expectedMeta = {
    foo: 'bar',
    baz: [
      'qux',
      'where',
      'waldo',
    ],
    more: {
      good: {
        stuff: [
          {
            lives: 'here',
          },
          {
            and: 'here',
          },
        ],
      },
    },
  };

  const expectedBody = '# Hello World';

  return fromString(input, 'markdown/hello.md', fm)
    .then(output => {
      t.deepEqual(output.meta, expectedMeta, 'Front matter transformed in to usable object');
      t.is(output.contents.toString(), expectedBody);
    });
});

test('No Front Matter', t => {
  const input = '# Hello World';
  const expected = '# Hello World';

  return fromString(input, 'markdown/hello.md', fm)
    .then(output => {
      t.deepEqual(output.meta, {}, 'Empty object');
      t.is(output.contents.toString(), expected);
    });
});

plugin(fm, test);
