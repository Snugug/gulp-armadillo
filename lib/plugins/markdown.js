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
    try {
      if (ext === '.md' || ext === '.markdown') {
        file.contents = new Buffer(md.render(file.contents.toString()));
        file.path = gutil.replaceExtension(file.path, '.html');
      }
    }
    // I don't know how to get markdown to throw (no tests on their end throwing) so can't force this condition
    /* istanbul ignore next */
    catch (e) {
      /* istanbul ignore next */
      this.emit('error', new PluginError(PLUGIN_NAME, `Error rendering ${file.path}:\n ${e.message}`));
    }


    this.push(file);

    cb();
  });
}
