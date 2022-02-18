"use strict";

import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";
import * as compression from "compression";

/**
 * this is the main file for the web-api application.
 *
 * @author Justin Kuenzel
 *
 * @copyright 2022, Justin Kuenzel, JuKuSoft
 */
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {VersionService} from "./info/version-service/version.service";
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";
import helmet from "helmet";
import {ValidationPipe} from "@nestjs/common";

// get the server host and port
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

const APP_TYPE = process.env.APP_TYPE || "web-api";

/**
 * The bootstrap function which starts the web server.
 */
async function bootstrap() {
  // TODO: check for app type
  if (APP_TYPE == "worker") {
    console.log("start worker now...");
    return;
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["log", "debug", "error", "verbose", "warn"],
  });

  app.use(compression());
  app.use(helmet());
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  // add auto-validation, see also: https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  // setup swagger
  const config = new DocumentBuilder()
      .setTitle("TS Connect API")
      .setDescription("The API for the TS Connect App")
      .setVersion(await new VersionService().getCurrentBackendVersion())
      .addTag("ts-connect")
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(PORT);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
bootstrap().then((r: void) => {
  // eslint-disable-next-line security-node/detect-crlf
  console.log(`server started at http://${HOST}:${PORT}`);
});
