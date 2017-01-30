'use strict';

const url = require('url');
const path = require('path');

const parseLinkLabel = require('remarkable/lib/helpers/parse_link_label');

const parser = (state, silent) => {
  const max = state.posMax;
  let labelStart = '';
  let labelEnd = '';
  let pos = '';
  let isVideo = false;
  let start = state.pos;
  let marker = state.src.charAt(start);

  if (marker === '@') {
    isVideo = true;
    marker = state.src.charCodeAt(++start);
  }

  if (marker !== 0x5B/* [ */) {
    return false;
  }

  // Ignoring don't know how to force maxNesting option in parse
  /* istanbul ignore next */
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  labelStart = start + 1;
  labelEnd = parseLinkLabel(state, start);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) {
    return false;
  }
  pos = labelEnd + 1;

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;  // eslint-disable-line no-param-reassign
    state.posMax = labelEnd;  // eslint-disable-line no-param-reassign

    if (isVideo) {
      state.push({
        type: 'video',
        src: state.src.substr(labelStart, labelEnd - labelStart),
        level: state.level,
      });
    }
  }

  state.pos = pos;  // eslint-disable-line no-param-reassign
  state.posMax = max;  // eslint-disable-line no-param-reassign

  return true;
};

function render(tokens) {
  const video = tokens[0];

  // Don't believe this is a problem any more, test suite that worked previously can't seem to recreate this…
  /* istanbul ignore next */
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

    // Ustream URLs (support both channel and recorded URLs)
    else if (uri.hostname === 'www.ustream.tv') {
      if (uri.path.split('/')[1] === 'channel') {
        embedURL = `https://www.ustream.tv/embed/${uri.path.split('/').pop()}?html5ui`;
      }

      else {
        embedURL = `https://www.ustream.tv/embed/recorded/${uri.path.split('/').pop()}?html5ui`;
      }
    }

    output += `<iframe  src="${embedURL}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;

    output += '</div>';
  }
  else {
    output += `<video src="${src}" type="video/${ext.replace('.', '')}" controls><a href="${src}">${src}</a></video>`;
  }

  return output;
}

module.exports = (md, options = {}) => {
  md.inline.ruler.before('links', 'video', parser, options);
  md.renderer.rules.video = render; // eslint-disable-line no-param-reassign
};
