'use strict';

const through = require('through2');
const gutil = require('gulp-util');
const path = require('path');
const nunjucks = require('../helpers/nunjucks');

const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'nunjucks';

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

      try {
        file.contents = new Buffer(nunjucks.renderString(content, context)); // eslint-disable-line no-param-reassign
      }
      catch (e) {
        this.emit('error', new PluginError(PLUGIN_NAME, `Error rendering ${file.path}:\n ${e.message}`)); // eslint-disable-line no-invalid-this
      }
    }

    this.push(file); // eslint-disable-line no-invalid-this

    return cb();
  });
};
