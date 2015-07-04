//////////////////////////////
// Swig
//  - A Gulp Plugin
//
// Builds Swig to HTML
//////////////////////////////
'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var through = require('through2'),
    gutil = require('gulp-util'),
    swig = require('swig'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'swig';

//////////////////////////////
// Set Swig stuff
//////////////////////////////
swig.setDefaults({
  'loader': swig.loaders.fs(process.cwd() + '/templates')
});

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
    console.log(file.meta);
    if (file.meta) {
      file.meta.filename = file.path;

      if (file.meta.template) {
        file.contents = new Buffer(swig.render(
          '{% extends "' + file.meta.template + '" %}' +
          '{% block title %}' + file.meta.title + '{% endblock %}' +
          '{% block content %}' + file.contents.toString() + '{% endblock %}'
          , file.meta)
        );
      }
      else {
        file.contents = new Buffer(swig.render(file.contents.toString(), file.meta));
      }


    }

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
