// eslint-disable-next-line max-len
import {CacheModule, CacheModuleOptions, Inject, Module, OnApplicationShutdown} from "@nestjs/common";
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
// eslint-disable-next-line max-len
import {ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions} from "@nestjs/throttler";
import {EventEmitterModule} from "@nestjs/event-emitter";
import * as redisStore from "cache-manager-redis-store";
import {APP_GUARD} from "@nestjs/core";
import {ScheduleModule} from "@nestjs/schedule";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {RedisClient} from "redis";

@Module({
  imports: [ConfigModule.forRoot({
    // When you want to use ConfigModule in other modules,
    // you'll need to import it.
    // see also: https://docs.nestjs.com/techniques/configuration
    load: [configuration],
    isGlobal: true,
  }), UserModule, InfoModule, AdminModule,
  ProfileModule, StatisticsModule, ChatModule, MessagesModule, AuthModule,
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dbHost: string = configService.get("db.mongodb.host");
      // eslint-disable-next-line max-len
      const dbPort: number = Number.parseInt(configService.get("db.mongodb.port"));
      const dbDatabase: string = configService.get("db.mongodb.database");
      const username: string = configService.get("db.mongodb.username");
      const password: string = configService.get("db.mongodb.password");
      const retryWrites: string = configService.get("db.mongodb.retryWrites");
      const w: string = configService.get("db.mongodb.w");

      const mongoDBUri: string = "mongodb+srv://" + username + ":" + password + "@" + dbHost + "/" + dbDatabase + "?retryWrites=" + retryWrites + "&w=" + w + "";

      const options: MongooseModuleOptions = {
        uri: mongoDBUri,
        connectionName: "root",
      };
      return options;
    },
    inject: [ConfigService],
  }),
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
      const options: CacheModuleOptions = {
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
      return options;
    },
    inject: [ConfigService],
  }),
  ScheduleModule.forRoot(),
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
  constructor(
      // ...
      // @Inject() private readonly redisConnection: RedisClient,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  /* async closeRedisConnection(): Promise<void> {
    this.redisConnection.quit();
    // this.logger.log('Redis connection is closed');
  }*/

  async onApplicationShutdown(signal?: string) {
    /* await Promise.all([
      this.closeRedisConnection(),
    ]).catch((error) => console.error(error.message));*/
    // process.exit(0);
  }
}
