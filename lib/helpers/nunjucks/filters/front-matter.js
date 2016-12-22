'use strict';

const fm = require('front-matter');
const fs = require('fs');
const path = require('path');

const r = require('nunjucks/src/runtime');

module.exports = nunjucks => {
  nunjucks.addFilter('attributes', (file, attribute) => {
    let content = '';
    const f = fs.readFileSync(path.join(process.cwd(), file));
    content = fm(f.toString());

    if (content.attributes) {
      if (attribute) {
        return content.attributes[attribute];
      }
      else {
        return content.attributes;
      }
    }
  });

  nunjucks.addFilter('body', file => {
    return r.markSafe(fm(fs.readFileSync(path.join(process.cwd(), file)).toString()).body);
  });
}
