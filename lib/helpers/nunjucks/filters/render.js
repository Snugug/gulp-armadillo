'use strict';

const md = require('../../markdown');
const fm = require('front-matter');
const fs = require('fs');
const path = require('path');

const r = require('nunjucks/src/runtime');

module.exports = nunjucks => {
  nunjucks.addFilter('render', file => {
    let content = fs.readFileSync(path.join(process.cwd(), file));
    const matter = fm(content.toString());
    const ext = path.extname(file);
    content = matter.body;

    if (ext === '.md' || ext === '.markdown') {
      content = md.render(content);
    }

    return r.markSafe(nunjucks.renderString(content, matter.attributes));
  });
};
