'use strict';

var fs = require('fs'),
    bowerDirectory = require('bower-directory'),
    path = require('path'),
    merge = require('merge');

var defaults = require(path.join(__dirname, 'config', 'armadillo.js'));

var findFile = function findFile (configPath, filename) {
  var HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
      dirname,
      parentDirname;

  configPath = configPath || path.join(process.cwd(), filename);

  if (fs.existsSync(configPath)) {
    return fs.realpathSync(configPath);
  }

  dirname = path.dirname(configPath);
  parentDirname = path.dirname(dirname);

  if (dirname === HOME || dirname === parentDirname) {
    return null;
  }

  configPath = path.join(parentDirname, filename);

  return findFile(configPath, filename);
};

module.exports = function (options, configPath) {
  var meta,
      metaPath,
      configMerge = false,
      configMergeExists = false,
      optionsMerge = false,
      optionsMergeExists = false,
      config = {},
      finalConfig = {};

  var bower = path.relative(process.cwd(), bowerDirectory.sync());

  // ensure our inline options and rules are not undefined
  options = options ? options : {};
  options.rules = options.rules ? options.rules : {};

  if (options.options && options.options['config-file']) {
    configPath = options.options['config-file'];
  }

  if (!configPath) {
    metaPath = findFile(false, 'package.json');
    meta = require(metaPath);

    if (meta.sasslintConfig) {

      configPath = path.resolve(path.dirname(metaPath), meta.sasslintConfig);
    }
    else {
      configPath = findFile(false, '.armadillo.js');
    }
  }
  else if (!path.isAbsolute(configPath)) {
    configPath = path.resolve(process.cwd(), configPath);
  }

  if (configPath) {
    if (fs.existsSync(configPath)) {
      config = require(configPath) || {};
      config.rules = config.rules ? config.rules : {};
    }
  }

  // check to see if user config contains an settings property and whether property has a property called mergeDefaultConfig
  configMergeExists = (config.settings && typeof config.settings.mergeDefaultConfig !== 'undefined');

  // If it does then retrieve the value of it here or return false
  configMerge = configMergeExists ? config.settings.mergeDefaultConfig : false;

  // check to see if inline options contains an options property and whether property has a property called merge-default-rules
  optionsMergeExists = (options.settings && typeof options.settings.mergeDefaultConfig !== 'undefined');

  // If it does then retrieve the value of it here or return false
  optionsMerge = optionsMergeExists ? options.settings.mergeDefaultConfig : false;


  // order of preference is inline options > user config > default config
  // merge-default-rules defaults to true so each step above should merge with the previous. If at any step merge-default-rules is set to
  // false it should skip that steps merge.

  finalConfig = merge.recursive(defaults, config, options);

  // if merge-default-rules is set to false in user config file then we essentially skip the merging with default rules by overwriting our
  // final rules with the content of our user config otherwise we don't take action here as the default merging has already happened
  if (configMergeExists && !configMerge) {
    finalConfig = config;
  }

  // if merge-default-rules is set to false in inline options we essentially skip the merging with our current rules by overwriting our
  // final rules with the content of our user config otherwise we check to see if merge-default-rules is true OR that we have any inline
  // rules, if we do then we want to merge these into our final ruleset.
  if (optionsMergeExists && !optionsMerge) {
    finalConfig = options;
  }
  else if ((optionsMergeExists && optionsMerge)) {
    finalConfig = merge.recursive(finalConfig, options);
  }

  finalConfig.folders[bower] = bower;
  finalConfig.assets.push([bower]);

  Object.keys(finalConfig.folders).forEach(function (key) {
    if (finalConfig.folders[key].slice(-1) == path.sep) {
      finalConfig.folders[key] = finalConfig.folders[key].substring(0, finalConfig.folders[key].length - 1);
    }
  });

  return finalConfig;
};
