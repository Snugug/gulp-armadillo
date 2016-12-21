'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const path = require('path');
const md = require('../helpers/markdown');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'markdown';

module.exports = () => {
  return through.obj(function(file, encoding, cb) {
    const ext = path.extname(file.path);

    /////////////////////////////
    // Errors
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    /////////////////////////////
    // Manipulate
    if (ext === '.md' || ext === '.markdown') {
      file.contents = new Buffer(md.render(file.contents.toString()));
      file.path = gutil.replaceExtension(file.path, '.html');
    }

    this.push(file);

    cb();
  });
}
