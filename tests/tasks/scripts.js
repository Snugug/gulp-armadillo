import test from 'ava';
import map from 'map-stream';
import scripts from '../../lib/tasks/scripts';
import {fromString, fromPath} from '../helpers/pipe';


test.cb('Compiles with Node Resolve', t => {
  const input = './tests/fixtures/js/app.js';
  const expected = "var index=function(a,b,c){for(c=c||'0',a=a.toString();a.length<b;)a=c+a;return a};const input=document.querySelector('#number'),output=document.querySelector('#output');input.addEventListener('change',()=>{output.textContent=index(input.value,10)});\n//# sourceMappingURL=../maps/app.js.map\n";
  let contents = '';

  scripts.compile(input)
    .pipe(map((file, cb) => {
      contents = file.contents.toString();
      cb(null, file);
    }))
    .on('error', e => {
      t.fail(e);
      t.end();
    })
    .on('end', () => {
      t.is(contents, expected, 'Compiled and minified');
      t.end();
    });
});

// test('Comiles, with Gulp', t => {
//   const input = './tests/fixtures/js/app.js';
//   const expected = "var index=function(a,b,c){for(c=c||'0',a=a.toString();a.length<b;)a=c+a;return a};const input=document.querySelector('#number'),output=document.querySelector('#output');input.addEventListener('change',()=>{output.textContent=index(input.value,10)});\n//# sourceMappingURL=maps/app.js.map\n";

//   return fromPath(input, gulp)
//     .then(output => {
//       console.log(output);

//       t.pass();
//     });
// });
