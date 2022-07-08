import { resolve } from 'path';
import { config } from 'dotenv';

import author from '@/modules/user';
import root from '@/modules/root';
import user from '@/modules/user';

import runServer from './server';
import mongodb from './mongodb';

(async () => {
  config({
    path: resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
  });

  await runServer([root, author, user], {
    database: await mongodb(),
  });
})();
