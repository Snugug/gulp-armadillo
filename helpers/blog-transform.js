//////////////////////////////
// Blog transform
//  - A Gulp Plugin
//
// Transforms a path into a blog-ready path
//////////////////////////////
'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var through = require('through2'),
    gutil = require('gulp-util'),
    path = require('path'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'blog-transform';

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
    var pth = file.path,
        pTransform,
        ext = path.extname(pth);

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
    pth = pth.split('/');
    if (pth[pth.length - 1] !== 'index.html') {
      pTransform = pth.pop();
      pth.push(pTransform.replace(ext, ''));
      pth.push('index.html');
    }

    pth = pth.join('/');

    file.path = pth;


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
