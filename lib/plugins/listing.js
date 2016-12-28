'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const listing = require('../helpers/listing');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'listing';


module.exports = () => {
  return through.obj(function(file, encoding, cb) {
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
    if (file.meta) {
      const lst = file.meta.listing;

      if (lst && lst.hasOwnProperty('folders')) {
        listing(lst.folders, lst)
          .then(result => {
            file.meta.listing = result;
            this.push(file);
            cb();
          })
          // Throwing this error for listing is difficult, so not going to test
          /* istanbul ignore next */
          .catch(e => {
            /* istanbul ignore next */
            this.emit('error', new PluginError(PLUGIN_NAME, 'Error generating listing from ${file.path}:\n ${e.message}'));
          });
      }
      else {
        this.push(file);
        cb();
      }
    }
    else {
      this.push(file);
      cb();
    }
  });
};
