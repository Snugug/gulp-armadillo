'use strict';

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const config = require('config');
const defaultConfig = require('./config/default');

const clean = require('./tasks/clean');
const sass = require('./tasks/sass');
const scripts = require('./tasks/scripts');
const pages = require('./tasks/pages');
const images = require('./tasks/images');
const copy = require('./tasks/copy');
const optimize = require('./tasks/optimize');

const watch = require('./tasks/watch');
const server = require('./tasks/server');
const build = require('./tasks/build');
const deploy = require('./tasks/deploy');
const dflt = require('./tasks/default');

const help = require('gulp-help');

module.exports = (glp, options) => {
  const gulp = help(glp);

  config.util.extendDeep(defaultConfig, options);
  config.util.setModuleDefaults('armadillo', defaultConfig);

  server(gulp);

  clean(gulp);

  sass(gulp);
  scripts(gulp);
  pages(gulp);
  images(gulp);
  copy(gulp);
  optimize(gulp);

  watch(gulp);
  build(gulp);
  deploy(gulp);
  dflt(gulp);
};
