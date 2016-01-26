'use strict';

var marked = require('marked'),
    fs = require('fs'),
    path = require('path'),
    URI = require('urijs'),
    renderer = new marked.Renderer();

renderer.image = function (href, title, text) {
  var ext = path.extname(href),
      uri = URI(href),
      localPath = this.options.localVideoPath ? this.options.localVideoPath : '',
      out = '',
      webm,
      mp4,
      alt;



  // YouTube Embed
  if (uri.hostname() === 'www.youtube.com') {
    if (title) {
      out += '<div class="video--' + title + '">';
    }

    console.log(uri.query().substring(2))

    out += '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + uri.query().substring(2) + '" frameborder="0" allowfullscreen></iframe>';

    if (title) {
      out += '</div>';
    }
  }
  // Vimeo Embed
  else if (uri.hostname() === 'vimeo.com') {
    if (title) {
      out += '<div class="video--' + title + '">';
    }

    out += '<iframe src="//player.vimeo.com/video/' + uri.path().split('/').pop() + '" width="560" height="315" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

    if (title) {
      out += '</div>';
    }
  }
  // Image output
  else if (ext !== '.webm' && ext !== '.mp4') {
    out = '<img src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
  }
  // Video Output
  else {
    out = '<video controls';
    // If a poster exists, add it
    if (title) {
      out += ' poster="' + title + '"';
    }
    out += '>';

    var webm = fs.statSync(file);
    var mp4 = fs.statSync(file.replace('.' + getFileExtension(file), '.mp4'));

    if (webm.size < mp4.size) {
      return 'webm';
    }
    else {
      return 'mp4';
    }
    // Video Source

    // If the file is local /and/ it's a .webm, see if the .mp4 version is available
    if (uri.protocol() === '' && ext === '.webm') {
      webm = href;
      mp4 = href.replace(ext, '.mp4');

      if (fs.existsSync(mp4)) {
        if (fs.statSync(webm).size < fs.statSync(webm).size) {
          out += '<source src="' + webm + '" type="video/webm">';
          out += '<source src="' + mp4 + '" type="video/mp4">';
        }
        else {
          out += '<source src="' + mp4 + '" type="video/mp4">';
          out += '<source src="' + webm + '" type="video/webm">';
        }
      }
    }
    else {
      out += '<source src="' + href + '" type="video/' + ext.replace('.', '') + '">'
    }
    // Fallback Text
    if (text) {
      out += text;
    }
    out += '</video>';
  }

  return out;
}

//////////////////////////////
// Export Marked with correct settings
//////////////////////////////
module.exports = function (file, options) {
  // Set Marked's rendereer to the custom renderer
  // optional `localVideoPath` option will be used to to find fallback videos for `.webm`. Defaults to ''
  marked.setOptions({
    'renderer': renderer,
    'gfm': true,
    'tables': true,
    'breaks': true,
    'pedantic': false,
    'sanitize': false,
    'smartLists': false,
    'smartypants': true,
    'langPrefix': 'language-'
  });

  return marked(file);
}
