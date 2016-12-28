import test from 'ava';
import path from 'path';
import clone from 'lodash/cloneDeep';
import { fromString, fromStringWithMeta } from '../helpers/pipe';
import plugin from '../helpers/plugin';
import listing from '../../lib/plugins/listing';

const files = [
  'tests/fixtures/listing/bar.html',
  'tests/fixtures/listing/baz/waldo.html',
  'tests/fixtures/listing/baz/where.html',
  'tests/fixtures/listing/foo.html',
  'tests/fixtures/listing/qux/batman.html',
  'tests/fixtures/listing/qux/robin.html',
];

test('Finds listing', t => {
  const input = 'Listing Test';
  const expected = clone(files);
  const folder = '../tests/fixtures/listing';
  const meta = {
    listing: {
      folders: [folder],
    },
  };

  return fromStringWithMeta(input, 'listing/foo.html', listing, meta)
    .then(output => {
      const lookup = output.meta.listing;

      t.true(lookup.hasOwnProperty(folder), 'Lookup is an object, contains the folder');
      t.true(Array.isArray(lookup[folder]), 'Lookup key is an array');

      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Default sort by name');

      lookup[folder].forEach(file => {
        t.true(file.hasOwnProperty('path'), 'File includes a path');
        t.true(file.hasOwnProperty('file'), 'File includes full path');
        t.true(file.hasOwnProperty('stat'), 'File includes stat');
        t.true(file.hasOwnProperty('meta'), 'File includes meta info');
        t.is(path.basename(file.path), 'index.html', 'File path is an index');
      });
    });
});

test('Has listing, but not special listing', t => {
  const input = 'Listing Test';
  const meta = {
    listing: [
      'foo',
      'bar',
      'baz',
    ],
  };

  return fromStringWithMeta(input, 'listing/foo.html', listing, meta)
    .then(output => {
      t.deepEqual(output.meta, meta, 'Does not transform meta if listing isn\'t special');
    });
});

test('No Meta', t => {
  const input = 'Listing Test';

  return fromString(input, 'listing/foo.html', listing)
    .then(output => {
      t.is(output.meta, undefined, 'Does not add/remove meta');
      t.is(output.contents.toString(), input);
    });
});

plugin(listing, test);
