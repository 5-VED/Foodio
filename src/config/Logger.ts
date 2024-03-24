import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.colorize(),
    format.align(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }), // Add timestamp to logs
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level} =====> ${message}`; // Base log message
    })
  ),
  transports: [
    new transports.Console(), 
  ],
});
