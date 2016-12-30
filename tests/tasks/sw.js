import test from 'ava';
import fs from 'fs';
import path from 'path';
import sw from '../../lib/tasks/sw';

const file = path.join(__dirname, '..', 'fixtures', 'sw.js');


test.cb('Generate Service Worker', t => {
  process.env.DEST = 'fixtures';

  sw(() => {
    const output = fs.readFileSync(file, 'utf-8');

    t.true(output.indexOf('var precacheConfig') >= 0, 'Contains precacheConfig');
    t.true(output.indexOf('/critical/css/style.css') >= 0, 'Contains CSS');
    t.true(output.indexOf('/critical/depth/index.html') >= 0, 'Contains HTML');
    t.end();
  });
});

test.after.always.cb('Cleanup file', t => {
  fs.unlinkSync(file);
  t.end();
});
