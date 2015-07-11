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

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (options) {
  options = options || {};

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
    var walk,
        end = [],
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
    walk = function(dir, done) {
      var results = [],
          pth,
          pTransform,
          stat;
      fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
          var file = list[i++];

          if (!file) return done(null, results);

          file = dir + '/' + file;
          fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              walk(file, function(err, res) {
                results = results.concat(res);
                next();
              });
            } else {
              stat = fs.statSync(file);
              pth = file.split('/');
              if (options.transformURL) {
                if (pth[pth.length - 1] !== 'index.html') {
                  pTransform = pth.pop();
                  pth.push(pTransform.replace(ext, ''));
                  pth.push('index.html');
                }
              }
              pth = pth.join('/');
              stat['path'] = pth;
              end.push(stat);
              stat = {};
              results.push(file);
              next();
            }
          });
        })();
      });
    };

    if (options.dir) {
      walk(options.dir, function (err, results) {
        if (err) {
          _this.emit('error', new PluginError(PLUGIN_NAME, err));
        }

        if (options.sort === 'created') {
          end = end.sort(birthTime);
        }
        else if (options.sort === 'modified') {
          end = end.sort(modTime);
        }

        if (options.reverse) {
          end = end.reverse();
        }

        file.dirmap = end;

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
