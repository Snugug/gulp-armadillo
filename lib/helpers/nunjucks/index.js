'use strict';

const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const config = require('config');

const filters = path.join(__dirname, 'filters');

let folders = [config.folders.pages];
// Ignoring because we can't have both in our config defaults for testing
/* istanbul ignore next */
if (Array.isArray(config.folders.templates)) {
  folders = folders.concat(config.folders.templates);
}
else {
  folders.push(config.folders.templates);
}

folders.push(process.cwd());

const env = nunjucks.configure(folders, {
  noCache: true,
});

fs.readdirSync(filters)
  .map(filter => {
    return require(path.join(filters, filter))(env);
  });

module.exports = env;
