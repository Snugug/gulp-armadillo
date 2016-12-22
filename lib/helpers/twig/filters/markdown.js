'use strict';

const md = require('../../markdown');

module.exports = twig => {
  twig.extendFilter('markdown', value => {
    return md.render(value);
  });
}
