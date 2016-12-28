'use strict';

const through = require('through2');
const gutil = require('gulp-util');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'empty';

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
    if (file.contents.toString() === '') {
      this.emit('error', new PluginError(PLUGIN_NAME, `${file.path} is empty`)); // eslint-disable-line no-invalid-this

      return cb();
    }

    this.push(file); // eslint-disable-line no-invalid-this

    return cb();
  });
};
