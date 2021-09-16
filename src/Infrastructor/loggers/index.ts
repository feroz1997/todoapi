import morgan from "morgan";
import expressWinston from "express-winston";
import winston from "winston";

import LoggerService from "../services/LoggerService";

export const developmentLogger = morgan("dev");

export const productionLogger = morgan("combined", { stream: LoggerService.logAccessStream });
 
export const errorLogger = expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
});

export const exceptionLogger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }), 
    ],
});
