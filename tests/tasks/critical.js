import test from 'ava';
import { fromPath } from '../helpers/pipe';

import critical from '../../lib/tasks/critical';

test('Compiles', t => {
  process.env.DEST = 'critical';

  const input = './tests/fixtures/critical/depth/index.html';
  const expected = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Depth</title><style type="text/css">body,html{background:0 0;border:0;font-size:100%;margin:0;outline:0;padding:0;vertical-align:baseline}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;box-sizing:border-box}body{line-height:1;background:#000}*,:after,:before{box-sizing:inherit}</style><link rel="preload" href="/css/style.css" as="style" onload="this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="/css/style.css"></noscript><script>!function(e){"use strict";var t=function(t,n,r){function o(e){return i.body?e():void setTimeout(function(){o(e)})}function a(){d.addEventListener&&d.removeEventListener("load",a),d.media=r||"all"}var l,i=e.document,d=i.createElement("link");if(n)l=n;else{var s=(i.body||i.getElementsByTagName("head")[0]).childNodes;l=s[s.length-1]}var u=i.styleSheets;d.rel="stylesheet",d.href=t,d.media="only x",o(function(){l.parentNode.insertBefore(d,n?l:l.nextSibling)});var f=function(e){for(var t=d.href,n=u.length;n--;)if(u[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",a),d.onloadcssdefined=f,f(a),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this),function(e){if(e.loadCSS){var t=loadCSS.relpreload={};if(t.support=function(){try{return e.document.createElement("link").relList.supports("preload")}catch(e){return!1}},t.poly=function(){for(var t=e.document.getElementsByTagName("link"),n=0;n<t.length;n++){var r=t[n];"preload"===r.rel&&"style"===r.getAttribute("as")&&(e.loadCSS(r.href,r),r.rel=null)}},!t.support()){t.poly();var n=e.setInterval(t.poly,300);e.addEventListener&&e.addEventListener("load",function(){e.clearInterval(n)}),e.attachEvent&&e.attachEvent("onload",function(){e.clearInterval(n)})}}}(this);</script></head><body><h1>Deeper Depth</h1></body></html>';

  return fromPath(input, critical.compile)
    .then(output => {
      t.is(output.contents.toString(), expected, 'Compiled, critical, and minified');
    });
});
