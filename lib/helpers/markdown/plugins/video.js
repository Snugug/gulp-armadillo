'use strict';

const url = require('url');
const path = require('path');

const parseLinkLabel = require('remarkable/lib/helpers/parse_link_label');
const parseLinkDestination = require('remarkable/lib/helpers/parse_link_destination');

const parser = (state) => {
  let href = '';

  let code = '';
  const max = state.posMax;
  const oldPos = state.pos;
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

  const labelStart = start + 1;
  const labelEnd = parseLinkLabel(state, start);

  if (labelEnd < 0) {
    return false;
  }

  let pos = labelEnd + 1;
  if (pos < max && state.src.charAt(pos) === '(') {
    // Skip space between ( and <href>
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) {
        break;
      }
    }

    // Ignoring don't know how to position greater than max
  /* istanbul ignore next */
    if (pos >= max) {
      return false;
    }

    // Parse <href>
    start = pos;
    if (parseLinkDestination(state, pos)) {
      href = state.linkContent;
      pos = state.pos;
    }
    else {
      href = '';
    }

    // End Parens
    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos; // eslint-disable-line no-param-reassign

      return false;
    }
    pos++;
  }

  state.push({
    type: 'video',
    src: href,
    label: state.src.substr(labelStart, labelEnd - labelStart),
  });

  state.pos = pos; // eslint-disable-line no-param-reassign
  state.posMax = max; // eslint-disable-line no-param-reassign

  return true;
};

function render(tokens) {
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
  md.renderer.rules.video = render; // eslint-disable-line no-param-reassign
};
