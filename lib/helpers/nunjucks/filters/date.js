'use strict';

const dateformat = require('dateformat');

module.exports = nunjucks => {
  nunjucks.addFilter('date', (value, format) => {
    let time = value;
    if (time === 'now') {
      time = Date.now();
    }
    return dateformat(time, format);
  });
}
