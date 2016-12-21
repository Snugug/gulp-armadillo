'use strict';

const url = require('url');
const path = require('path');

const parseLinkLabel = require('remarkable/lib/helpers/parse_link_label');
const parseLinkDestination = require('remarkable/lib/helpers/parse_link_destination');
const parseLinkTitle = require('remarkable/lib/helpers/parse_link_title');
const normalizeReference = require('remarkable/lib/helpers/normalize_reference');

const parser = (state, silent) => {
  let href = '';
  let title = '';

  let code = '';
  const max = state.posMax;
  let oldPos = state.pos;
  let start = state.pos;
  let marker = state.src.charAt(start);

  if (marker === '@') {
    marker = state.src.charAt(++start);

    if (marker !== '[') {
      return false;
    }
  }
  // Ignoring don't know how to force maxNesting option in parse
  /* istanbul ignore next */
  if (state.level > state.options.maxNesting) {
    return false;
  }

  let labelStart = start + 1;
  let labelEnd = parseLinkLabel(state, start);

  if (labelEnd < 0) {
    return false;
  }

  let pos = labelEnd + 1;
  if (pos < max && state.src.charAt(pos) === '(') {
    // Skip space between ( and <href>
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // Parse <href>
    start = pos;
    if (parseLinkDestination(state, pos)) {
      href = state.linkContent;
      pos = state.pos;
    } else {
      href = '';
    }

    // End Parens
    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  }

  state.push({
    type: 'video',
    src: href,
    label: state.src.substr(labelStart, labelEnd - labelStart),
  });

  state.pos = pos;
  state.posMax = max;
  return true;
}

const render = function(tokens, idx, options, env, self) {
  const video = tokens[0];

  if (video.type !== 'video') {
    return video.content;
  }

  const src = video.src || video.label;
  const ext = path.extname(src);
  const uri = url.parse(src);
  let output = '';

  if (uri.hostname) {
    let embedURL = video.href;

    output += '<div class="flexible-video">';

    // YouTube URL
    if (uri.hostname === 'www.youtube.com') {
      embedURL = `https://www.youtube.com/embed/${uri.query.substring(2)}`;
    }
    // Vimeo URL
    else if (uri.hostname === 'vimeo.com') {
      embedURL = `//player.vimeo.com/video/${uri.path.split('/').pop()}`;
    }

    output += `<iframe  src="${embedURL}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;

    output += '</div>';
  }
  else {
    output += `<video src="${src}" type="video/${ext.replace('.', '')}" controls><a href="${src}">${video.label}</a></video>`;
  }

  return output;
}

module.exports = (md, options = {}) => {
  md.inline.ruler.before('links', 'video', parser, options);
  md.renderer.rules.video = render;
  // console.log(md.renderer.rules);
  // md.renderer.rules.push('video', render, options);
};

// rules.image = function(tokens, idx, options) {
//   var src = ' src="' + escapeHtml(tokens[idx].src) + '"';
//   var title = tokens[idx].title ? (' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"') : '';
//   var alt = ' alt="' + (tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : '') + '"';
//   var suffix = options.xhtmlOut ? ' /' : '';
//   return '<img' + src + alt + title + suffix + '>';
// };
