import pino from "pino";
import { HttpError } from "elysia-http-error";
const logger1 = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,         // ✅ enable colors
      translateTime: true,    // 🕒 show readable timestamp
    //   ignore: 'pid,hostname', // 🙈 clean up unnecessary fields
    },
  },
});
const logger = pino(pino.destination(1)); // just plain JSON output to stdout

logger1.info('hi')

export default logger1;
export const  HttpErrorLogger = (error: HttpError) => {
  logger1.error(error.message);
  console.error({
    message: error.message,
    statusCode: error.statusCode,
    errorData: error,
  });

  throw error
}