import { resolve } from 'path';
import { config } from 'dotenv';

import runServer from './server';

import author from '@/modules/author';

(async () => {
  config({
    path: resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
  });

  await runServer([author]);
})();
