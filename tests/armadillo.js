import test from 'ava';
import armadillo from '../lib/helpers/armadillo';


test.serial('First armadillo', t => {
  const output = armadillo('First test');
  const expected = "\n               ,.-----__\n            ,:::://///,:::-.\n          /:''/////// ``:::`;/|/     .------------.\n         /'   ||||||     :://'`\\     | First test |\n        .' ,   ||||||     `/(  e \\   /------------'\n  -===~__-'\\__X_`````\\_____/~`-._ `.  \n              ~~        ~~       `~-'\n";

  t.is(output, expected);
});


test.serial('Second armadillo', t => {
  const output = armadillo('Second test');
  const expected = "\n:-.\n::`;/|/     .-------------.\n:://'`\\     | Second test |\n `/(  e \\   /-------------'\n__/~`-._ `.  \n~       `~-'\n";

  t.is(output, expected);
});
