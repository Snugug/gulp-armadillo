'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const path = require('path');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'path-transform';

module.exports = () => {
  return through.obj(function (file, encoding, cb) {
    // ///////////////////////////
    // Errors
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!')); // eslint-disable-line no-invalid-this

      return cb();
    }

    // ///////////////////////////
    // Manipulate
    if (path.basename(file.path) !== 'index.html') {
      file.path = path.join(gutil.replaceExtension(file.path, ''), 'index.html'); // eslint-disable-line no-param-reassign
    }

    this.push(file); // eslint-disable-line no-invalid-this

    return cb();
  });
};
