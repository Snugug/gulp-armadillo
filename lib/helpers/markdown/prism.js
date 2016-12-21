'use strict';

const fs = require('fs');
const path = require('path');

function uniq(arr) {
  const set = arr.reduce((set, item) => {
    set[item] = true;
    return set;
  }, {});
  return Object.keys(set);
}

const prismCore = 'prismjs/components/prism-core';
const Prism = require(prismCore);

const prelude = [
  'prism-clike', 'prism-javascript', 'prism-markup',
  'prism-c', 'prism-ruby', 'prism-css',
];
const prismComponents = path.dirname(require.resolve(prismCore));
const components = prelude.concat(fs.readdirSync(prismComponents))
        .map((component) => component.replace(/(\.min)?\.js$/, ''));

const componentsSet = uniq(components);
componentsSet
  .forEach((component) => require(path.join(prismComponents, component)));

module.exports = Prism;

/*
The MIT License (MIT)

Copyright (c) 2016 Benjy Cui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
