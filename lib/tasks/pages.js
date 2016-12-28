'use strict';

const lazypipe = require('lazypipe');
const config = require('config');

const nunjucks = require('../plugins/nunjucks');
const fm = require('../plugins/front-matter');
const listing = require('../plugins/listing');
const md = require('../plugins/markdown');
const path = require('../plugins/path-transform');

module.exports.compile = lazypipe()
  .pipe(fm)
  .pipe(listing)
  .pipe(md)
  .pipe(nunjucks)
  .pipe(path);
