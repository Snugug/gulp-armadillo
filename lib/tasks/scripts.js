'use strict';

const lazypipe = require('lazypipe');
const config = require('config');

const gutil = require('gulp-util');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const maps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const lint = require('gulp-eslint');

const plumber = require('gulp-plumber');

const path = require('path');

module.exports.compile = file => {
  const rollupOptions = config.get('rollup');
  const babelOptions = config.get('babel');

  let entry = rollupOptions.entry;

  if (file) {
    entry = file;
    rollupOptions.entry = file;
  }

  return rollup(rollupOptions)
    .on('error', function (error) {
      const message = new gutil.PluginError('rollup', `${gutil.colors.underline(entry)}\n${error}`);
      if (config.failOnError) {
        throw new Error(error);
      }
      else {
        process.stderr.write(message + '\n');
        this.emit('end');
      }
    })
    .pipe(source(path.basename(entry), path.dirname(entry)))
    .pipe(buffer())
    .pipe(maps.init({
      loadMaps: true,
    }))
    .pipe(babel(babelOptions))
    .pipe(maps.write(config.sourcemaps.directory))
}

module.exports.lint = lazypipe()
  .pipe(lint);
