import pino from 'pino';
import { config } from '../config/env';

const logger = pino({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

export default logger;
