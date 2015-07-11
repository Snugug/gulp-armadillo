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
    path = require('path'),
    fs = require('fs-extra'),
    fm = require('front-matter'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'swig',
    gulpSwig;

//////////////////////////////
// Set Swig stuff
//////////////////////////////


//////////////////////////////
// Export
//////////////////////////////
gulpSwig = function (options) {
  options = options || {};

  var swig = gulpSwig.compiler;

  swig.setDefaults({
    'loader': swig.loaders.fs(process.cwd() + '/templates'),
    'cache': false
  });

  //////////////////////////////
  // Swig Filters
  //////////////////////////////
  swig.setFilter('attributes', function (file, attribute) {
    var content;
    file = fs.readFileSync(process.cwd() + '/' + file);

    content = fm(file.toString());

    if (content.attributes) {
      if (attribute) {
        return content.attributes[attribute];
      }
      else {
        return content.attributes;
      }
    }
    else {
      return {};
    }

    return file;
  });

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
    var ext = path.extname(file.path),
        context = {};

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
    if (ext === '.html') {
      if (file.meta) {
        context.locals = file.meta;
        context.locals._pages = file.dirmap;
        context.filename = file.path;

        // If a template exists in the meta info, build a content block and extend for it
        if (file.meta.template) {
          file.contents = new Buffer(swig.render(
            '{% extends "' + file.meta.template + '" %}' +
            '{% block content %}' + file.contents.toString() + '{% endblock %}'
            , context)
          );
        }
        // Otherwise, just render it!
        else {
          file.contents = new Buffer(swig.render(file.contents.toString(), context));
        }
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

gulpSwig.compiler = require('swig');

module.exports = gulpSwig;