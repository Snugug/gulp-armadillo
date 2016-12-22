'use strict';

const fm = require('front-matter');
const fs = require('fs');
const path = require('path');

module.exports = twig => {
  twig.extendFilter('attributes', (file, attribute) => {
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

  twig.extendFilter('body', file => {
    return fm(fs.readFileSync(path.join(process.cwd(), file)).toString()).body;
  });
}
