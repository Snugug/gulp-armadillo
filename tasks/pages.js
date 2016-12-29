'use strict';

const config = require('config');

const clone = require('lodash/cloneDeep');
const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const pages = require('../lib/tasks/pages');
const sync = require('browser-sync');

module.exports = gulp => {
  // ////////////////////////////
  // Compile all Pages
  // ////////////////////////////
  gulp.task('pages', 'Compiles markdown and HTML files using Nunjucks, making front matter available at compile time', () => {
    return gulp.src(config.watch.pages)
      .pipe(pages.compile())
        .on('error', failure('pages'))
      .pipe(gulp.dest(task.dest('')))
      .pipe(sync.stream({
        match: '**/*.html',
      }));
  });

  // ////////////////////////////
  // Watch for changes in all Pages and recompile them
  // ////////////////////////////
  const watch = clone(config.watch.pages);
  watch.push(`${config.folders.templates}/**/*`);

  task.watch('pages', watch, 'pages', gulp);
};
