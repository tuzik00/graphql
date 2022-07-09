import { resolve } from 'path';
import { config } from 'dotenv';

import root from '@/modules/root';
import user from '@/modules/user';
import route from '@/modules/route';

import runServer from './server';
import mongodb from './mongodb';

(async () => {
  config({
    path: resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
  });

  await runServer([root, route, user], {
    database: await mongodb(),
  });
})();
