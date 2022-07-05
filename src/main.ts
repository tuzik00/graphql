import { resolve } from 'path';
import { config } from 'dotenv';

import runServer from './server';

import * as author from '@/modules/author';
import * as test from '@/modules/test';

(async () => {
  console.log(`.env.${process.env.NODE_ENV}`);
  config({
    path: resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
  });

  await runServer([author, test]);
})();
