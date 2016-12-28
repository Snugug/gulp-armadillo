'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const fm = require('front-matter');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'front-matter';

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
    const content = fm(file.contents.toString());

    file.meta = content.attributes; // eslint-disable-line no-param-reassign
    file.contents = new Buffer(content.body); // eslint-disable-line no-param-reassign

    this.push(file); // eslint-disable-line no-invalid-this

    return cb();
  });
};
