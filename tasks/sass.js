const sass = require('../lib/tasks/sass');

module.exports = gulp => {
  gulp.task('sass', () => {
    return gulp.src('sass/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('css'));
  });
};
