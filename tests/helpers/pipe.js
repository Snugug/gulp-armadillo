'use strict';

const vs = require('vinyl-string');
const vfs = require('vinyl-fs');
const map = require('map-stream');

const fromString = (input, path, func) => {
  return new Promise((res, rej) => {
    let contents = '';

    const vFile = vs(input, {
      path,
    });

    vFile
      .pipe(func())
      .on('error', e => {
        rej(e);
      })
      .pipe(map((file, cb) => {
        contents = file;
        cb(null, file);
      }))
      .on('end', () => {
        res(contents);
      });
  });
};

const fromStringWithMeta = (input, path, func, meta) => {
  return new Promise((res, rej) => {
    let contents = '';

    const vFile = vs(input, {
      path,
    });

    vFile
      .pipe(map((file, cb) => {
        const f = file;
        f.meta = meta;
        cb(null, f);
      }))
      .pipe(func())
      .on('error', e => {
        rej(e);
      })
      .pipe(map((file, cb) => {
        contents = file;
        cb(null, file);
      }))
      .on('end', () => {
        res(contents);
      });
  });
};

const fromNull = func => {
  return new Promise((res, rej) => {
    let contents = '';

    const vFile = vs('null', { path: 'this/is/null' });

    vFile
      .pipe(map((file, cb) => {
        const f = file;
        f.contents = null;
        cb(null, f);
      }))
      .pipe(func())
      .on('error', e => {
        rej(e);
      })
      .pipe(map((file, cb) => {
        contents = file;
        cb(null, file);
      }))
      .on('end', () => {
        res(contents);
      });
  });
};

const fromStream = func => {
  return new Promise((res, rej) => {
    let contents = '';

    const vFile = vs('stream', { path: 'this/is/a/stream' });

    vFile
      .pipe(map((file, cb) => {
        const f = file;
        f.contents = vs('stream', { path: 'this/is/a/stream' });
        cb(null, f);
      }))
      .pipe(func())
      .on('error', e => {
        rej(e);
      })
      .pipe(map((file, cb) => {
        contents = file;
        cb(null, file);
      }))
      .on('end', () => {
        res(contents);
      });
  });
};

const fromPath = (input, func) => {
  return new Promise((res, rej) => {
    let contents = '';

    vfs.src(input)
      .pipe(func())
      .on('error', e => {
        rej(e);
      })
      .pipe(map((file, cb) => {
        contents = file;
        cb(null, file);
      }))
      .on('end', () => {
        res(contents);
      });
  });
};

module.exports = {
  fromString,
  fromStringWithMeta,
  fromNull,
  fromPath,
  fromStream,
};
