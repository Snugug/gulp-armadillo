import test from 'ava';
import path from 'path';
import clone from 'lodash/cloneDeep';
import listing from '../../lib/helpers/listing';

const files = [
  'tests/fixtures/listing/bar.html',
  'tests/fixtures/listing/baz/waldo.html',
  'tests/fixtures/listing/baz/where.html',
  'tests/fixtures/listing/foo.html',
  'tests/fixtures/listing/qux/batman.html',
  'tests/fixtures/listing/qux/robin.html',
];

test('Default - String', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files);
  return listing(folder)
    .then(lookup => {
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

test('Default - Array', t => {
  const folder = ['../tests/fixtures/listing'];
  const expected = clone(files);
  return listing(folder)
    .then(lookup => {
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

test('Sort - published', t => {
  const folder = '../tests/fixtures/listing';
  const expected = [
    'tests/fixtures/listing/qux/batman.html',
    'tests/fixtures/listing/qux/robin.html',
    'tests/fixtures/listing/foo.html',
    'tests/fixtures/listing/baz/waldo.html',
    'tests/fixtures/listing/baz/where.html',
    'tests/fixtures/listing/bar.html',
  ];
  const options = {
    sort: 'published',
  };

  return listing(folder, options)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Reverse sort by name');
    });
});

test('Reverse', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files).reverse();
  return listing(folder, {reverse: true})
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Reverse sort by name');
    });
});

test('Ignore - has', t => {
  const folder = '../tests/fixtures/listing';
  const expected = [];
  const opts = {
    ignore: [{
      attribute: 'content',
      operator: 'has',
    }],
  };

  return listing(folder, opts)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Ignore all files with `content` meta');
    });
});


test('Ignore - is', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files);
  expected.shift();

  const opts = {
    ignore: [{
      attribute: 'content',
      operator: 'is',
      value: 'bar',
    }],
  };

  return listing(folder, opts)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Ignore all files that contain `content: bar`');
    });
});

test('Ignore - is not', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files).splice(0, 1);

  const opts = {
    ignore: [{
      attribute: 'content',
      operator: 'is not',
      value: 'bar',
    }],
  };

  return listing(folder, opts)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Ignore all files that do not contain `content: bar`');
    });
});

test('Ignore - greater than', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files);
  expected.shift();

  const opts = {
    ignore: [{
      attribute: 'number',
      operator: 'gt',
      value: 0,
    }],
  };

  return listing(folder, opts)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Ignore all files that where `number > 0`');
    });
});

test('Ignore - greater than equal to', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files);
  expected.shift();

  const opts = {
    ignore: [{
      attribute: 'number',
      operator: 'gte',
      value: 100,
    }],
  };

  return listing(folder, opts)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Ignore all files that where `number >= 100`');
    });
});

test('Ignore - less than', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files);
  expected.shift();

  const opts = {
    ignore: [{
      attribute: 'number',
      operator: 'lt',
      value: 101,
    }],
  };

  return listing(folder, opts)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Ignore all files that where `number < 101`');
    });
});

test('Ignore - less than equal to', t => {
  const folder = '../tests/fixtures/listing';
  const expected = clone(files);
  expected.shift();

  const opts = {
    ignore: [{
      attribute: 'number',
      operator: 'lte',
      value: 100,
    }],
  };

  return listing(folder, opts)
    .then(lookup => {
      const lookupFiles = lookup[folder].map(file => {
        return file.file;
      });

      t.deepEqual(lookupFiles, expected, 'Ignore all files that where `number <= 100`');
    });
});


