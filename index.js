'use strict';

module.exports = function (gulp, options) {
  if (!options) {
    options = {};
  }

  //////////////////////////////
  // Sass Tasks
  //////////////////////////////
  if (!options.sass) {
    options.sass = {};
  }
  require('./tasks/sass')(gulp, null, options.sass);


  //////////////////////////////
  // Deploy Tasks
  //////////////////////////////
  if (!options.deploy) {
    options.deploy = {};
  }
  require('./tasks/deploy')(gulp, null, options.deploy);


  //////////////////////////////
  // ESLint Tasks
  //////////////////////////////
  if (!options.eslint) {
    options.eslint = {};
  }
  require('./tasks/eslint')(gulp, null, options.eslint);

  //////////////////////////////
  // Browser Sync Tasks
  //////////////////////////////
  if (!options.browserSync) {
    options.browserSync = {};
  }
  require('./tasks/browser-sync')(gulp, null, options.browserSync);


  //////////////////////////////
  // Imagemin Tasks
  //////////////////////////////
  if (!options.imagemin) {
    options.imagemin = {};
  }
  require('./tasks/imagemin')(gulp, null, options.imagemin);


  //////////////////////////////
  // Copy Tasks
  //////////////////////////////
  if (!options.copy) {
    options.copy = {};
  }
  require('./tasks/copy')(gulp, null, options.copy);


  //////////////////////////////
  // Clean Tasks
  //////////////////////////////
  if (!options.clean) {
    options.clean = {};
  }
  require('./tasks/clean')(gulp, null, options.clean);


  //////////////////////////////
  // Build Tasks
  //////////////////////////////
  if (!options.build) {
    options.build = {};
  }
  require('./tasks/build')(gulp, null, options.build);


  //////////////////////////////
  // Watch Tasks
  //////////////////////////////
  if (!options.watch) {
    options.watch = {};
  }
  require('./tasks/watch')(gulp, null, options.watch);


  //////////////////////////////
  // Serve Tasks
  //////////////////////////////
  if (!options.serve) {
    options.serve = {};
  }
  require('./tasks/serve')(gulp, null, options.serve);

  //////////////////////////////
  // Default Task
  //////////////////////////////
  gulp.task('default', ['serve']);

  //////////////////////////////
  // Usemin Tasks
  //////////////////////////////
  if (!options.usemin) {
    options.usemin = {};
  }
  require('./tasks/usemin')(gulp, null, options.usemin);

  //////////////////////////////
  // Pages Tasks
  //////////////////////////////
  if (!options.pages) {
    options.pages = {};
  }
  require('./tasks/pages')(gulp, null, options.pages);

  //////////////////////////////
  // Critical Tasks
  //////////////////////////////
  if (!options.critical) {
    options.critical = {};
  }
  require('./tasks/critical')(gulp, null, options.critical);

  //////////////////////////////
  // Dist Tasks
  //////////////////////////////
  if (!options.dist) {
    options.dist = {};
  }
  require('./tasks/dist')(gulp, null, options.dist);
}