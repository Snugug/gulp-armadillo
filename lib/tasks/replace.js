'use strict';

const config = require('config');

const lazypipe = require('lazypipe');
const replace = require('gulp-replace');

module.exports.base = lazypipe()
  .pipe(replace, `<base href="${config.replace.base.find}">`, `<base href="${config.replace.base.replace}">`);
