'use strict';

const glob = require('glob');
const fm = require('front-matter');
const fs = require('fs');
const config = require('config');
const path = require('path');
const gutil = require('gulp-util');
const get = require('lodash/get');

const sortBy = {
  created: 'stat.birthtime',
  modified: 'stat.mtime',
  published: 'stat.published',
  updated: 'stat.updated',
  name: 'file',
};

const sorter = (a, b, sort) => {
  let first = get(a, sortBy[sort]);
  let second = get(b, sortBy[sort]);

  if (typeof first === 'string') {
    first = Date.parse(first);
  }
  if (typeof second === 'string') {
    second = Date.parse(second);
  }

  if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }

  return 0;
};

const filterer = (item, ignore) => {
  let ditch = false;

  ignore.some(ignored => {
    if (item.meta.hasOwnProperty(ignored.attribute)) {
      if (ignored.operator === 'has') {
        ditch = true;
      }
      else if (ignored.operator === 'is') {
        ditch = item.meta[ignored.attribute] === ignored.value;
      }
      else if (ignored.operator === 'is not') {
        ditch = item.meta[ignored.attribute] !== ignored.value;
      }
      else if (ignored.operator === 'gt') {
        ditch = item.meta[ignored.attribute] > ignored.value;
      }
      else if (ignored.operator === 'lt') {
        ditch = item.meta[ignored.attribute] < ignored.value;
      }
      else if (ignored.operator === 'gte') {
        ditch = item.meta[ignored.attribute] >= ignored.value;
      }
      else if (ignored.operator === 'lte') {
        ditch = item.meta[ignored.attribute] <= ignored.value;
      }
    }
    else if (ignored.operator === 'missing') {
      ditch = true;
    }

    return ditch;
  });

  return !ditch;
};

module.exports = (fldrs, opts = {}) => {
  const folders = Array.isArray(fldrs) ? fldrs : [fldrs];
  const sort = opts.sort || 'name';
  const filter = opts.ignore || [];
  const reverse = opts.reverse || false;

  function sortee(a, b) {
    return sorter(a, b, sort);
  }

  function filtee(elem) {
    return filterer(elem, filter);
  }

  const lookup = folders.map(folder => {
    const globule = path.join(config.folders.pages, folder, '**', '*');
    const base = path.join(config.folders.pages, folder);
    let files = glob.sync(globule);

    files = files.filter(file => {
      if (path.extname(file) === '') {
        return false;
      }

      if (path.basename(file) === '404.html' || path.basename(file) === '404.md' || path.basename(file) === '404.markdown') {
        return false;
      }

      return true;
    }).map(file => {
      return new Promise((res, rej) => {
        fs.stat(file, (err, stat) => {
          // Don't want to mock killing FS
          /* istanbul ignore next */
          if (err) {
            rej(err);
          }

          let pth = path.posix.normalize(file);

          if (path.basename(pth) !== 'index.html') {
            pth = path.posix.join(gutil.replaceExtension(pth, ''), 'index.html').replace(base, '').substr(1);
          }

          res({
            path: pth,
            file,
            stat,
          });
        });
      }).then(obj => {
        return new Promise((res, rej) => {
          fs.readFile(file, 'utf8', (err, data) => {
            // Don't want to mock killing FS
            /* istanbul ignore next */
            if (err) {
              rej(err);
            }

            const attrs = fm(data).attributes;

            obj.stat.published = attrs.published; // eslint-disable-line no-param-reassign
            obj.stat.updated = attrs.updated; // eslint-disable-line no-param-reassign

            // Can't reliably test both this _and_ sort
            /* istanbul ignore next */
            if (!attrs.published) {
              obj.stat.published = obj.stat.birthtime; // eslint-disable-line no-param-reassign
            }

            if (!attrs.updated) {
              obj.stat.updated = obj.stat.mtime; // eslint-disable-line no-param-reassign
            }

            obj.meta = attrs; // eslint-disable-line no-param-reassign

            res(obj);
          });
        });
      });
    });

    return Promise.all(files)
      .then(filez => {
        let f = filez
          .sort(sortee)
          .filter(filtee);

        if (reverse) {
          f = f.reverse();
        }

        return f;
      });
  });

  return Promise.all(lookup)
    .then(files => {
      const obj = {};

      folders.forEach((folder, i) => {
        obj[folder] = files[i];
      });

      return obj;
    });
};
