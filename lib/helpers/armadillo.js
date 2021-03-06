'use strict';

const chalk = require('chalk');
let counter = 0;

module.exports = text => {
  const border = Array(text.length + 3).join('-');
  let armadillo = '';

  // ////////////////////////////
  // Armadillo ASCII Art
  // ////////////////////////////
  if (counter === 0) {
    armadillo =
      `${chalk.red('\n               ,.-----__') +
      chalk.red('\n            ,:::://///,:::-.') +
      chalk.red('\n          /:\'\'/////// ``:::`;/|/') + chalk.magenta(`     .${border}.`) +
      chalk.red('\n         /\'   ||||||     :://\'`\\') + chalk.magenta('     | ') + chalk.yellow.bold(text) + chalk.magenta(' |') +
      chalk.red('\n        .\' ,   ||||||     `/(  ') + chalk.white('e') + chalk.red(' \\') + chalk.magenta(`   /${border}'`) +
      chalk.red('\n  -===~__-\'\\__X_`````\\_____/~`-._ `.') + chalk.magenta('  ') +
      chalk.red('\n              ~~        ~~       `~-\'')}\n`;
  }
  else {
    armadillo =
      `${chalk.red('\n:-.') +
      chalk.red('\n::`;/|/') + chalk.magenta(`     .${border}.`) +
      chalk.red('\n:://\'`\\') + chalk.magenta('     | ') + chalk.yellow.bold(text) + chalk.magenta(' |') +
      chalk.red('\n `/(  ') + chalk.white('e') + chalk.red(' \\') + chalk.magenta(`   /${border}'`) +
      chalk.red('\n__/~`-._ `.') + chalk.magenta('  ') +
      chalk.red('\n~       `~-\'')}\n`;
  }

  console.log(armadillo); // eslint-disable-line no-console
  counter++;

  return armadillo;
};
