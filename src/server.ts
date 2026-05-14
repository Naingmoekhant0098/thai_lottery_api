import app from './app';
import logger from './utils/logger';
import { config } from './config/env';

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT} in ${config.nodeEnv} mode`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});
