//////////////////////////////
// Walk
//  - A Gulp Plugin
//
// Walks a directory to find all files
//////////////////////////////
'use strict';

//////////////////////////////
// Variables
//////////////////////////////
var through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs-extra'),
    path = require('path'),
    fm = require('front-matter'),
    Promise = require('bluebird'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME = 'walk';

var birthTime = function birthTime(a,b) {
  if (a.birthtime < b.birthtime) {
    return -1;
  }
  if (a.birthtime > b.birthtime) {
    return 1;
  }
  return 0;
};

var modTime = function modTime(a,b) {
  if (a.mtime < b.mtime) {
    return -1;
  }
  if (a.mtime > b.mtime) {
    return 1;
  }
  return 0;
}

var pubTime = function modTime(a,b) {
  if (Date.parse(a.meta.published) < Date.parse(b.meta.published)) {
    return -1;
  }
  if (Date.parse(a.meta.published) > Date.parse(b.meta.published)) {
    return 1;
  }
  return 0;
}


var updTime = function modTime(a,b) {
  if (Date.parse(a.meta.updated) < Date.parse(b.updated)) {
    return -1;
  }
  if (Date.parse(a.meta.updated) > Date.parse(b.updated)) {
    return 1;
  }
  return 0;
}

var walker = function (dir, config, cb) {
  var end = [];

  var walk = function(dir, done) {
    var results = [],
        pth,
        pTransform,
        ext,
        content,
        stat;
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];

        if (!file) return done(null, results);

        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          var ignore = false;

          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            stat = fs.statSync(file);
            pth = file.split('/');
            pth.shift();
            if (config.settings.transformURL) {
              if (pth[pth.length - 1] !== 'index.html' && pth[pth.length - 1] !== '404.html') {
                pTransform = pth.pop();
                ext = path.extname(file);
                pth.push(pTransform.replace(ext, ''));
                pth.push('index.html');
              }
            }
            else {
              pth[pth.length - 1] = pth[pth.length - 1].replace(ext, '.html');
            }
            pth = pth.join('/');
            stat['path'] = pth;
            stat['file'] = file;
            content = fm(fs.readFileSync(file, 'utf-8'));
            stat['meta'] = content.attributes;

            if (!content.attributes.published) {
              stat.published = stat.birthtime;
            }
            else {
              stat.published = content.attributes.published;
            }

            if (!content.attributes.updated) {
              stat.updated = stat.mtime;
            }
            else {
              stat.updated = content.attributes.updated;
            }

            if (config.walker.ignore) {
              config.walker.ignore.forEach(function (ignored) {
                if (stat.meta.hasOwnProperty(ignored.attribute)) {
                  if (ignored.operator === 'has') {
                    ignore = true;
                  }
                  else if (ignored.operator === 'is') {
                    ignore = stat.meta[ignored.attribute] === ignored.value;
                  }
                  else if (ignored.operator === 'is not') {
                    ignore = stat.meta[ignored.attribute] !== ignored.value;
                  }
                  else if (ignored.operator === 'gt') {
                    ignore = stat.meta[ignored.attribute] > ignored.value;
                  }
                  else if (ignored.operator === 'lt') {
                    ignore = stat.meta[ignored.attribute] < ignored.value;
                  }
                  else if (ignored.operator === 'gte') {
                    ignore = stat.meta[ignored.attribute] >= ignored.value;
                  }
                  else if (ignored.operator === 'lte') {
                    ignore = stat.meta[ignored.attribute] <= ignored.value;
                  }
                } else if (ignored.operator === 'missing') {
                  ignore = true;
                }
              });
            }

            if (!ignore) {
              end.push(stat);
              results.push(file);
            }

            stat = {};
            next();
          }
        });
      })();
    });
  };

  dir = path.join(config.folders.pages, dir);

  return new Promise(function (resolve, reject) {
    walk(dir, function (err, result) {
      if (err) {
        reject(err);
      }
      else {
        resolve(end);
      }
    });
  });
};

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (config) {
  var options = options || {};

  //////////////////////////////
  // Command line arguments for each option
  //////////////////////////////
  process.argv.forEach(function (val, index, array) {
    if (index >= 3) {
      switch (val) {
        case '--fail': options.failOnError = true; break;
      }
    }
  });

  //////////////////////////////
  // Through Object
  //////////////////////////////
  var compile = through.obj(function (file, encoding, cb) {
    var walkAsync,
        _this = this;
    /////////////////////////////
    // Default plugin issues
    //////////////////////////////
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    //////////////////////////////
    // Manipulate Files
    //////////////////////////////

    walkAsync = Promise.promisify(walker);

    if (file.meta.listing) {
      config.walker = file.meta.listing;

      Promise.map(file.meta.listing.folders, function (folder) {
        return walker(folder, config).then(function (results) {
          var base = path.basename(folder);
          var result = {};

          if (file.meta.listing.sort === 'created') {
            results = results.sort(birthTime);
          }
          else if (file.meta.listing.sort === 'modified') {
            results = results.sort(modTime);
          }
          else if (file.meta.listing.sort === 'published') {
            results = results.sort(pubTime);
          }
          else if (file.meta.listing.sort === 'updated') {
            results = results.sort(updTime);
          }

          if (file.meta.listing.reverse) {
            results = results.reverse();
          }

          result[base] = results;

          return result;
        });
      }).then(function (results) {
        var listings = {};

        results.forEach(function (result) {
          var key = Object.keys(result);
          listings[key] = result[key];
        });

        file.meta.listing = listings;

        //////////////////////////////
        // Push the file back to the stream!
        //////////////////////////////
        _this.push(file);

        //////////////////////////////
        // Callback to tell us we're done
        //////////////////////////////
        cb();
      });
    }
    else {
      //////////////////////////////
      // Push the file back to the stream!
      //////////////////////////////
      this.push(file);

      //////////////////////////////
      // Callback to tell us we're done
      //////////////////////////////
      cb();
    }
  })

  return compile;
}
