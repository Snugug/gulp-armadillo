'use strict';

const config = require('config');
const cache = require('gulp-cached');
const sequence = require('../lib/helpers/sequence');
const task = require('../lib/helpers/task');
const sync = require('browser-sync');

module.exports = gulp => {
  gulp.task('copy', 'Copies static assets', cb => {
    return sequence(config.tasks.copy, cb);
  });

  gulp.task('copy:cname', 'Copies CNAME file', () => {
    return gulp.src('CNAME')
      .pipe(gulp.dest(task.dest('')))
      .pipe(sync.stream());
  });

  gulp.task('copy:videos', 'Copies video files', () => {
    return gulp.src(`${config.folders.videos}/**/*`)
      .pipe(cache('videos'))
      .pipe(gulp.dest(task.dest(config.folders.videos)))
      .pipe(sync.stream());
  });

  gulp.task('copy:audio', 'Copies audio files', () => {
    return gulp.src(`${config.folders.audio}/**/*`)
      .pipe(cache('audio'))
      .pipe(gulp.dest(task.dest(config.folders.audio)))
      .pipe(sync.stream());
  });

  gulp.task('copy:documents', 'Copies document files', () => {
    return gulp.src(`${config.folders.documents}/**/*`)
      .pipe(cache('documents'))
      .pipe(gulp.dest(task.dest(config.folders.documents)))
      .pipe(sync.stream());
  });

  gulp.task('copy:fonts', 'Copies font files', () => {
    return gulp.src(`${config.folders.fonts}/**/*`)
      .pipe(cache('fonts'))
      .pipe(gulp.dest(task.dest(config.folders.fonts)))
      .pipe(sync.stream());
  });

  gulp.task('copy:watch', 'Watches static assets and copies them on change', ['copy'], () => {
    return gulp.watch([
      `${config.folders.videos}/**/*`,
      `${config.folders.audio}/**/*`,
      `${config.folders.documents}/**/*`,
      `${config.folders.fonts}/**/*`,
    ], ['copy']);
  });
}
