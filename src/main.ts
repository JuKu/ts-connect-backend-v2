"use strict";

/**
 * this is the main file for the web-api application.
 *
 * @author Justin Kuenzel
 *
 * @copyright 2022, Justin Kuenzel, JuKuSoft
 */
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

// get the server host and port
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

/**
* The bootstrap function which starts the web server.
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
