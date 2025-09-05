import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import logger from "./lib/logger";
import { appRoutes } from "./app.routes";
import serverTiming from "@elysiajs/server-timing"
import cors from "@elysiajs/cors"
import { httpError } from "elysia-http-error";
import { ip } from "elysia-ip";
import { requestID } from "elysia-requestid";
import metricsMiddleware from "elysia-prometheus-metrics"
import logger1 from "./lib/logger";

const elysiaApp = new Elysia({cookie:{secrets:["Mohamed1234!@#$A"]}})
.use(cors({credentials: true})) // only for development
// .use(metricsMiddleware({}))
.use(serverTiming())
// .use(httpError())
.use(ip())
.use(requestID())
.use(
  swagger({
    exclude: ["/swagger"],
    autoDarkMode: true,
    documentation: {
      info: {
        title: "🦊 Elysia Clean Architecture",
        description:
          "Clean Architecture pattern for ElysiaJS + Bun + Postgresql + Redis",
        version: "1.0.0",
        license: {
          name: "MIT",
          url: "https://opensource.org/license/mit/",
        },
        contact: {
          name: "Lucas André Henry",
          url: "https://www.linkedin.com/in/lucas-henryd/",
        },
      },
    },
  }),
)
.onBeforeHandle((ctx) => {
  logger1.info(`🦊 on before  ${ctx.requestID} ${ctx.ip} ${ctx.request.method} ${ctx.request.url} ${ctx.request.headers.get('user-agent')}`);
})
.onAfterHandle((ctx : any ) => {
  if(ctx.response.data){
   return {
       status: "success",
       code: 200,
       message : "Request processed successfully",
       data: ctx.response.data,
       timestamp : new Date().toISOString(),
       requestID : ctx.requestID
   }
  }
 })
  // Add this route to see current system stats
  .get("/stats", () => ({
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    platform: process.platform,
    nodeVersion: process.version,
    pid: process.pid,
  }))
.use(appRoutes)


.get("/", () => "Hello Elysia").listen(3005);

logger.info(`🦊 Elysia is running at ${elysiaApp.server?.hostname}:${elysiaApp.server?.port}`);

export type TElysiaApp = typeof elysiaApp;