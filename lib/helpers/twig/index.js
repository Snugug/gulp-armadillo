'use strict';

const Twig = require('twig');
const fs = require('fs');
const path = require('path');

const filters = path.join(__dirname, 'filters');

fs.readdirSync(filters)
  .map(filter => {
    return require(path.join(filters, filter))(Twig);
  });

module.exports = Twig.twig;
