import test from 'ava';

import failure from '../../lib/helpers/failure';

const CI = process.env.CI;
const FOE = process.env.FAIL_ON_ERROR;

test.serial.cb('Logs out error', t => {
  process.env.FAIL_ON_ERROR = 'false';

  const context = {
    emit: input => {
      t.is(input, 'end', 'End emitted');
      t.end();
    }
  }

  failure('test').call(context, 'Test Failure Log');
});

test.serial('Fails on error, FAIL_ON_ERROR', t => {
  process.env.FAIL_ON_ERROR = 'true';

  t.throws(() => {
    failure('test').call('Test Failure Throw - Fail on Error');
  });
});

test.serial('Fails on error, CI', t => {
  process.env.CI = 'true';

  t.throws(() => {
    failure('test').call('Test Failure Throw - CI');
  });
});

test.afterEach.always('Reset Env Vars', t => {
  if (CI === undefined)  {
    delete process.env.CI;
  }
  else {
    process.env.CI = CI;
  }

  if (FOE === undefined)  {
    delete process.env.FAIL_ON_ERROR;
  }
  else {
    process.env.FAIL_ON_ERROR = FOE;
  }
});
