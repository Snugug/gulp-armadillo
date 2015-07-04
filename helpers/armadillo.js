'use strict';

var chalk = require('chalk');

module.exports = function (text) {
  var border = Array(text.length + 3).join('-');

  //////////////////////////////
  // Armadillo ASCII Art
  //////////////////////////////
  var armadillo =
    chalk.red('\n               ,.-----__') +
    chalk.red('\n            ,:::://///,:::-.') +
    chalk.red('\n          /:\'\'/////// ``:::`;/|/') + chalk.magenta('     .' + border + '.') +
    chalk.red('\n         /\'   ||||||     :://\'`\\') + chalk.magenta('     | ') + chalk.yellow.bold(text) + chalk.magenta(' |') +
    chalk.red('\n        .\' ,   ||||||     `/(  ') + chalk.white('e') + chalk.red(' \\') + chalk.magenta('   /' + border + '\'') +
    chalk.red('\n  -===~__-\'\\__X_`````\\_____/~`-._ `.') + chalk.magenta('  ') +
    chalk.red('\n              ~~        ~~       `~-\'') + '\n';

  console.log(armadillo);
  return armadillo;
}