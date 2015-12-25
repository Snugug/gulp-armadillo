//////////////////////////////
// FM
//  - A Gulp Plugin
//
// Extracts Frontmatter
//////////////////////////////
'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var through = require('through2'),
    gutil = require('gulp-util'),
    fm = require('front-matter'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'fm';

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (options) {
  options = options || {};

  //////////////////////////////
  // Command line arguments for each option
  //////////////////////////////
  process.argv.forEach(function (val, index, array) {
    if (index >= 3) {
      switch (val) {
        case '--fail': options.failOnError = true; break;
      }
    }
  });

  //////////////////////////////
  // Through Object
  //////////////////////////////
  var compile = through.obj(function (file, encoding, cb) {
    var content;
    /////////////////////////////
    // Default plugin issues
    //////////////////////////////
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    //////////////////////////////
    // Manipulate Files
    //////////////////////////////
    content = fm(file.contents.toString());

    if (!file.meta) {
      file.meta = content.attributes;
    }
    else {
      file.meta = {};
    }

    file.meta.today = Date.now();

    file.contents = new Buffer(content.body);

    //////////////////////////////
    // Push the file back to the stream!
    //////////////////////////////
    this.push(file);

    //////////////////////////////
    // Callback to tell us we're done
    //////////////////////////////
    cb();
  })

  return compile;
}
