'use strict';

var path = require('path'),
    fs = require('fs');

var isFile = function (path) {
  try {
    return fs.statSync(path).isFile();
  } catch (e) {
    return false;
  }
}

var readJSON = function (filePath, options) {
  return JSON.parse(String(fs.readFileSync(filePath, options)).replace(/^\ufeff/g, ''));
};

var getBowerDir = function (json) {
  return path.join(json.cwd || '', json.directory || 'bower_components');
}

module.exports = function bowerDirectory (option) {
  option = option || {};

  var resolve = path.resolve.bind(path, option.cwd || '');

  var bowerrcPath = resolve('.bowerrc');

  if (isFile(bowerrcPath)) {
    return resolve(getBowerDir(readJSON(bowerrcPath)));
  } else {
    return resolve('bower_components');
  }
};
