"use strict";

import {SwaggerModule, DocumentBuilder} from "@nestjs/swagger";

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

// get the server host and port
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

/**
 * The bootstrap function which starts the web server.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
