'use strict';

module.exports = {
  folders: {
    critical: 'tests/fixtures/critical',
    fixtures: 'tests/fixtures',
  },
  replace: {
    base: {
      find: '/',
      replace: 'https://snugug.github.io/gulp-armadillo/',
    },
  },
};
