'use strict';

const md = require('../../markdown');

const r = require('nunjucks/src/runtime');

module.exports = nunjucks => {
  nunjucks.addFilter('markdown', value => {
    return r.markSafe(md.render(value));
  });
}
