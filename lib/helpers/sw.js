'use strict';

const config = require('config');

const updated = config.sw.browser.notify ? `var swUpdated = document.createElement('div');
swUpdated.classList.add('sw-notice');
swUpdated.setAttribute('data-sw', 'updated');
swUpdated.setAttribute('role', 'status');
swUpdated.setAttribute('aria-live', 'polite');
swUpdated.textContent = '${config.sw.browser.updated}';
document.body.appendChild(swUpdated);` : `console.log('${config.sw.browser.updated}');`;

const offline = config.sw.browser.notify ? `var swOffline = document.createElement('div');
swOffline.classList.add('sw-notice');
swOffline.setAttribute('data-sw', 'offline');
swOffline.setAttribute('role', 'status');
swOffline.setAttribute('aria-live', 'polite');
swOffline.textContent = '${config.sw.browser.offline}';
document.body.appendChild(swOffline);` : `console.log('${config.sw.browser.offline}');`;

// Adapted from https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
module.exports = `if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('${config.sw.file}')
    .then(function(reg) {
      reg.onupdatefound = function swUpdate() {
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function swChange() {
          switch(installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                ${updated}
              }
              else {
                ${offline}
              }
              break;
            case 'redundant':
              console.error('Redundant ServiceWorker');
              break;
          }
        }
      }
    }).catch(function swError(e) {
      console.error('Error during service worker registration:', e);
    });
}`;
