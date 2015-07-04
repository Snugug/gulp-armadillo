'use strict';

var chalk = require('chalk');

var welcome =
  chalk.red('\n               ,.-----__') +
  chalk.red('\n            ,:::://///,:::-.') +
  chalk.red('\n          /:\'\'/////// ``:::`;/|/') + chalk.magenta('     .------------.') +
  chalk.red('\n         /\'   ||||||     :://\'`\\') + chalk.magenta('     | ') + chalk.yellow.bold('Let\'s Roll') + chalk.magenta(' |') +
  chalk.red('\n        .\' ,   ||||||     `/(  ') + chalk.white('e') + chalk.red(' \\') + chalk.magenta('   \/------------\'') +
  chalk.red('\n  -===~__-\'\\__X_`````\\_____/~`-._ `.') + chalk.magenta('  ') +
  chalk.red('\n              ~~        ~~       `~-\'') + '\n';

console.log(welcome);