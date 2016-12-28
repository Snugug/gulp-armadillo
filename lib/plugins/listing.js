'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const listing = require('../helpers/listing');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'listing';

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
    if (file.meta) {
      const lst = file.meta.listing;

      if (lst && lst.hasOwnProperty('folders')) {
        return listing(lst.folders, lst)
          .then(result => {
            file.meta.listing = result; // eslint-disable-line no-param-reassign
            this.push(file); // eslint-disable-line no-invalid-this

            return cb();
          })

          // Throwing this error for listing is difficult, so not going to test
          /* istanbul ignore next */
          .catch(e => {
            /* istanbul ignore next */
            this.emit('error', new PluginError(PLUGIN_NAME, `Error generating listing from ${file.path}:\n ${e.message}`)); // eslint-disable-line no-invalid-this
          });
      }
    }

    this.push(file); // eslint-disable-line no-invalid-this

    return cb();
  });
};
