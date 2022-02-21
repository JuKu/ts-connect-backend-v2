import {CacheModule, CacheModuleOptions,
  Module, OnApplicationShutdown} from "@nestjs/common";
import {AppController} from "./app.controller";
import {UserModule} from "./user/user.module";
import {InfoModule} from "./info/info.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AdminModule} from "./admin/admin.module";
import {ProfileModule} from "./profile/profile.module";
import {StatisticsModule} from "./statistics/statistics.module";
import {ChatModule} from "./chat/chat.module";
import {MessagesModule} from "./messages/messages.module";
import {AuthModule} from "./auth/auth.module";
import configuration from "../config/configuration";
import {ThrottlerGuard, ThrottlerModule,
  ThrottlerModuleOptions} from "@nestjs/throttler";
import {EventEmitterModule} from "@nestjs/event-emitter";
import * as redisStore from "cache-manager-redis-store";
import {APP_GUARD} from "@nestjs/core";
import {ScheduleModule} from "@nestjs/schedule";
import {DatabaseModule} from "./database/database.module";
import {WinstonModule} from "nest-winston";
import {WinstonModuleOptions} from "nest-winston/dist/winston.interfaces";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import winston, {format, transports} from "winston";

@Module({
  imports: [ConfigModule.forRoot({
    // When you want to use ConfigModule in other modules,
    // you'll need to import it.
    // see also: https://docs.nestjs.com/techniques/configuration
    load: [configuration],
    isGlobal: true,
  }), DatabaseModule, UserModule, InfoModule, AdminModule,
  ProfileModule, StatisticsModule, ChatModule, MessagesModule, AuthModule,
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const options: ThrottlerModuleOptions = {
        ttl: Number.parseInt(configService.get("ratelimiter.ttl")),
        limit: Number.parseInt(configService.get("ratelimiter.limit")),
      };
      return options;
    },
    inject: [ConfigService],
  }),
  EventEmitterModule.forRoot({
    // set this to `true` to use wildcards
    wildcard: false,
    // the delimiter used to segment namespaces
    delimiter: ".",
    // set this to `true` if you want to emit the newListener event
    newListener: false,
    // set this to `true` if you want to emit the removeListener event
    removeListener: false,
    // the maximum amount of listeners that can be assigned to an event
    maxListeners: 10,
    // eslint-disable-next-line max-len
    // show event name in memory leak message when more than maximum amount of listeners is assigned
    verboseMemoryLeak: false,
    // eslint-disable-next-line max-len
    // disable throwing uncaughtException if an error event is emitted and it has no listeners
    ignoreErrors: false,
  }),
  CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      if (configService.get<string>("NODE_ENV") === "test") {
        // use in-memory store
        console.info("use in-memory cache");

        const testOptions: CacheModuleOptions = {
          isGlobal: true,
        };
        return testOptions;
      }

      const prodOptions: CacheModuleOptions = {
        isGlobal: true,
        store: redisStore,

        // Store-specific configuration:
        socket: {
          "host": configService.get("cache.redis.host"),
          "port": Number.parseInt(configService.get("cache.redis.port")),
          "auth_pass": configService.get("cache.redis.password"),
        },

        host: configService.get("cache.redis.host"),
        port: Number.parseInt(configService.get("cache.redis.port")),
        auth_pass: configService.get("cache.redis.password"),
        db: configService.get("cache.redis.db"),

        ttl: configService.get("cache.ttl"),
      };
      return prodOptions;
    },
    inject: [ConfigService],
  }),
  ScheduleModule.forRoot(),
  WinstonModule.forRootAsync({
    imports: [ConfigModule],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    useFactory: (configService: ConfigService) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const winston = require("winston");
      const winstonOptions: WinstonModuleOptions = {
        level: "info",
        levels: {
          error: 0,
          warn: 1,
          info: 2,
          http: 3,
          verbose: 4,
          debug: 5,
          silly: 6,
        },
        format: format.combine(
            winston.format.timestamp({
              // format: "YYYY-MM-DD'T'HH:mm:ss.SSSZ",
            }),
            format.errors({stack: true}),
            winston.format.json(),
        ),
        defaultMeta: {service: process.env.SERVICE_NAME || "web-api"},
        transports: [
          new transports.Console(),
          new transports.File({
            filename: "logs/error.log",
            level: "warn",
          }),
          new transports.File({filename: "logs/all.log"}),
          // new winston.transports.Console({ format: winston.format.simple() })
        ],
        exitOnError: false,
      };

      return winstonOptions;
    },
    inject: [ConfigService],
  }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

/**
 * the top-level app module.
 */
export class AppModule implements OnApplicationShutdown {
  /**
   * The constructor.
   *
   * @return {void}
   */
  constructor(
      // ...
      // @Inject() private readonly redisConnection: RedisClient,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {
  }

  /* async closeRedisConnection(): Promise<void> {
    this.redisConnection.quit();
    // this.logger.log('Redis connection is closed');
  }*/

  /**
   * This method is executed if the server shutdowns.
   *
   * @param {string?} signal the shutdown signal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,require-jsdoc
  async onApplicationShutdown(signal?: string) {
    /* await Promise.all([
      this.closeRedisConnection(),
    ]).catch((error) => console.error(error.message));*/
  }
}
