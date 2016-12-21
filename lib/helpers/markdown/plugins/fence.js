'use strict';

const utils = require('remarkable/lib/common/utils');

module.exports = function(tokens, idx, options, env, self) {
  const token = tokens[idx];
  let langClass = '';
  let langPrefix = options.langPrefix;
  let langName = '';
  let fenceName = '';

  if (token.params) {
    fenceName = token.params.split(/\s+/g)[0];
    langName = utils.escapeHtml(utils.replaceEntities(utils.unescapeMd(fenceName)));
    langClass = langName ? `class="${langPrefix}${langName}"` : '';
  }

  const highlighted = options.highlight(token.content, langName) || utils.escapeHtml(token.content);

  return `<pre ${langClass}><code ${langClass}>${highlighted}</code></pre>${this.getBreak(tokens, idx)}`;
};
