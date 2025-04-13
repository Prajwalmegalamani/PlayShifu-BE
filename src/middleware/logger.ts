import winston from "winston";

// Logger middleware
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Logger middleware
export default (req: any, res: any, next: any): void => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
