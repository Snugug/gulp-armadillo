'use strict';

const Remarkable = require('remarkable');
const Prism = require('./prism');

const fence = require('./plugins/fence');
const video = require('./plugins/video');

// Create Markdown instance
const md = new Remarkable({
  highlight: (code, lang) => {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang]);
    }

    return '';
  },
});

// Update Fence rule
md.renderer.rules.fence = fence;
md.use(video);

module.exports = md;
