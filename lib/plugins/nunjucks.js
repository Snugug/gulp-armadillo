'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const path = require('path');
const config = require('config');
const nunjucks = require('../helpers/nunjucks');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'nunjucks';


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
    if (path.extname(file.path) === '.html') {
      const context = file.meta || {};
      let content = file.contents.toString();
      context.filename = file.path;

      // console.log(file.stats);

      // console.log(context);

      // if (!file.meta.published) {
      //   context.published = file.state.birthtime;
      // }

      // if (!file.meta.updated) {
      //   context.updated = file.state.mtime;
      // }

      // context.stats = file.stats;

      if (context.hasOwnProperty('template')) {
        content = `{% extends "${context.template}" %}{% block content %}${content}{% endblock %}`;
      }

      file.contents = new Buffer(nunjucks.renderString(content, context));
    }

    this.push(file);
    cb();
  });
};
