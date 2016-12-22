'use strict';

const md = require('../../markdown');
const fm = require('front-matter');
const fs = require('fs');
const path = require('path');

module.exports = twig => {
  twig.extendFilter('render', file => {
    let content = fs.readFileSync(path.join(process.cwd(), file));
    const matter = fm(content.toString());
    const ext = path.extname(file);
    content = matter.body;

    if (ext === '.md' || ext === '.markdown') {
      content = md.render(content);
    }

    const output = twig.twig({
      data: content,
    });

    return output.render(matter.attributes);
  });
}
