import test from 'ava';
import {build} from '../../lib/helpers/sequence';

test('Build from Array', t => {
  const cb = (error) => error;
  const input = [
    'sass',
    'js'
  ];

  const expected = input;
  expected.push(cb);

  const output = build(input, cb);

  t.deepEqual(output, expected, 'CB is added to input array');
});

test('Build from Object', t => {
  const cb = (error) => error;
  const input = {
    clean: [
      'clean',
      'clear',
    ],
    build: [
      'sass',
      'js',
    ],
  }

  const expected = [
    [
      'clean',
      'clear',
    ],
    [
      'sass',
      'js',
    ],
    cb,
  ];

  const output = build(input, cb);

  t.deepEqual(output, expected, 'CB is added to input array');
});
