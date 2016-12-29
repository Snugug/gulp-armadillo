'use strict';

const config = require('config');

const clone = require('lodash/cloneDeep');
const failure = require('../lib/helpers/failure');
const task = require('../lib/helpers/task');
const pages = require('../lib/tasks/pages');
const sync = require('browser-sync');

module.exports = gulp => {
  const build = [
    `${config.folders.pages}/**/*.html`,
    `${config.folders.pages}/**/*.md`,
    `${config.folders.pages}/**/*.markdown`,
  ];
  const watch = clone(build);
  watch.push(`${config.folders.templates}/**/*.html`);

  // ////////////////////////////
  // Compile all Pages
  // ////////////////////////////
  gulp.task('pages', 'Compiles markdown and HTML files using Nunjucks, making front matter available at compile time', () => {
    return gulp.src(build)
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
  task.watch('pages', watch, 'pages', gulp);
};
