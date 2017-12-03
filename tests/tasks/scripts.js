import test from 'ava';
import map from 'map-stream';
import scripts from '../../lib/tasks/scripts';

test.cb('Compiles with Node Resolve', t => {
  const input = './tests/fixtures/js/app.js';
  const expected = "'use strict';'serviceWorker'in navigator&&navigator.serviceWorker.register('/sw.js').then(function(a){a.onupdatefound=function(){var c=a.installing;c.onstatechange=function(){switch(c.state){case'installed':if(navigator.serviceWorker.controller){var f=document.createElement('div');f.classList.add('sw-notice'),f.setAttribute('data-sw','updated'),f.setAttribute('role','status'),f.setAttribute('aria-live','polite'),f.textContent='Content has been added or updated, refresh to get it!',document.body.appendChild(f)}else{var g=document.createElement('div');g.classList.add('sw-notice'),g.setAttribute('data-sw','offline'),g.setAttribute('role','status'),g.setAttribute('aria-live','polite'),g.textContent='Content is now available offline!',document.body.appendChild(g)}break;case'redundant':console.error('Redundant ServiceWorker');}}}}).catch(function(b){console.error('Error during service worker registration:',b)});var leftpad=function(a,b,c){for(c=c||'0',a=a.toString();a.length<b;)a=c+a;return a};const input=document.querySelector('#number'),output=document.querySelector('#output');input.addEventListener('change',()=>{output.textContent=leftpad(input.value,10)});\n//# sourceMappingURL=../maps/app.js.map\n";
  let contents = '';

  scripts.compile(input)
    .on('error', e => {
      t.fail(e);
      t.end();
    })
    .pipe(map((file, cb) => {
      contents = file.contents.toString();
      cb(null, file);
    }))
    .on('end', () => {
      t.is(contents, expected, 'Compiled and minified');
      t.end();
    });
});
