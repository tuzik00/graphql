import { resolve } from 'path';
import { config } from 'dotenv';

import runServer from './server';

import * as author from './modules/author';
import * as test from './modules/test';

(async () => {
  config({
    path: resolve(process.cwd(), '.env'),
  });

  await runServer([author, test]);
})();
