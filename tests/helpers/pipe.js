'use strict'

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
      .pipe(map((file, cb) => {
        contents = file.contents.toString();
        cb(null, file);
      }))
      .on('error', e => {
        rej(e);
      })
      .on('end', () => {
        res(contents);
      });
  });
}

const fromPath = (input, func) => {
  return new Promise((res, rej) => {
    let contents = '';

    vfs.src(input)
      .pipe(func())
      .pipe(map((file, cb) => {
        contents = file.contents.toString();
        cb(null, file);
      }))
      .on('error', e => {
        rej(e);
      })
      .on('end', () => {
        res(contents);
      });
  });
}


module.exports = {
  fromString,
  fromPath,
}
