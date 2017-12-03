'use strict';

const fs = require('fs');
const path = require('path');
const prismCore = 'prismjs/components/prism-core';
const Prism = require(prismCore);

// Components that others have dependencies on
const preload = [
  'prism-markup',
  'prism-css',
  'prism-clike',
  'prism-c',
  'prism-javascript',
  'prism-java',
  'prism-ruby',
  'prism-basic',
  'prism-cpp',
];

const prismComponents = path.dirname(require.resolve(prismCore));
const components = fs.readdirSync(prismComponents)
  .filter(component => {
    const name = path.basename(component, '.js');
    if (path.extname(name) === '.min') {
      return false;
    }
    else if (name === 'prism-core') {
      return false;
    }

    return preload.indexOf(component) < 0;
  })
  .map(component => {
    return component.replace(path.extname(component), '');
  });

preload.concat(components).forEach(component => {
  require(path.join(prismComponents, component)); // eslint-disable-line global-require
});

module.exports = Prism;
