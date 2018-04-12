import test from 'ava';
import { fromPath } from '../helpers/pipe';

import critical from '../../lib/tasks/critical';

test('Compiles', t => {
  process.env.DEST = 'critical';

  const input = './tests/fixtures/critical/depth/index.html';
  const expected = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Depth</title><style type="text/css">body,html{background:0 0;border:0;font-size:100%;margin:0;outline:0;padding:0;vertical-align:baseline}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{line-height:1}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}body{background:#000}</style><link rel="preload" href="/css/style.css" as="style" onload="this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="/css/style.css"></noscript><script>!function(u){"use strict";var e=function(e,t,n){var r,o=u.document,a=o.createElement("link");if(t)r=t;else{var l=(o.body||o.getElementsByTagName("head")[0]).childNodes;r=l[l.length-1]}var i=o.styleSheets;a.rel="stylesheet",a.href=e,a.media="only x",function e(t){if(o.body)return t();setTimeout(function(){e(t)})}(function(){r.parentNode.insertBefore(a,t?r:r.nextSibling)});var d=function(e){for(var t=a.href,n=i.length;n--;)if(i[n].href===t)return e();setTimeout(function(){d(e)})};function s(){a.addEventListener&&a.removeEventListener("load",s),a.media=n||"all"}return a.addEventListener&&a.addEventListener("load",s),(a.onloadcssdefined=d)(s),a};"undefined"!=typeof exports?exports.loadCSS=e:u.loadCSS=e}("undefined"!=typeof global?global:this),function(r){if(r.loadCSS){var e=loadCSS.relpreload={};if(e.support=function(){try{return r.document.createElement("link").relList.supports("preload")}catch(e){return!1}},e.poly=function(){for(var e=r.document.getElementsByTagName("link"),t=0;t<e.length;t++){var n=e[t];"preload"===n.rel&&"style"===n.getAttribute("as")&&(r.loadCSS(n.href,n,n.getAttribute("media")),n.rel=null)}},!e.support()){e.poly();var t=r.setInterval(e.poly,300);r.addEventListener&&r.addEventListener("load",function(){e.poly(),r.clearInterval(t)}),r.attachEvent&&r.attachEvent("onload",function(){r.clearInterval(t)})}}}(this);</script></head><body><h1>Deeper Depth</h1></body></html>';

  return fromPath(input, critical.compile)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Compiled, critical, and minified');
    });
});
