import {Module} from "@nestjs/common";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {DatabaseService} from "./database/database.service";
import {MongoDbTestService} from "./mongo-dbtest/mongo-db-test.service";
import {BullModule, BullModuleOptions} from "@nestjs/bull";
import Bull from "bull";
import {RedisModule, RedisModuleOptions} from "@liaoliaots/nestjs-redis";

@Module({
  imports: [
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

        // mongodb-srv cannot have a port number
        let mongoDBUri: string = "mongodb+srv://" + username + ":" + password + "@" + dbHost + "/" + dbDatabase + "?retryWrites=" + retryWrites + "&w=" + w + "";

        if (configService.get<string>("NODE_ENV") === "test") {
          const mongoDbTestService = new MongoDbTestService();
          mongoDBUri = await mongoDbTestService.createInMemoryInstance();
          console.info("use mongodb test instance: " + mongoDBUri);
        } else {
          console.info("use normal mongodb instance: " + mongoDBUri);
        }

        const options: MongooseModuleOptions = {
          uri: mongoDBUri,
          connectionName: "root",
        };
        return options;
      },
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const host: string = configService.get<string>("redis.host");
        const port: number = Number.parseInt(
            configService.get<string>("redis.port"));
        const password: string = configService.get<string>("redis.password");
        const database: number = Number.parseInt(
            configService.get<string>("redis.db"));

        const redisOptions1 : RedisModuleOptions = {
          closeClient: true,
          config: {
            name: "root-redis",
            host: host,
            port: port,
            password: password,
            db: database,
            keyPrefix: "ts_",
          },
        };
        return redisOptions1;
      },
      inject: [ConfigService],
    }),
    // for queuing
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const host: string = configService.get<string>("queue.redis.host");
        const port: number = Number.parseInt(
            configService.get<string>("queue.redis.port"));
        const password: string = configService
            .get<string>("queue.redis.password");
        const database: number = Number.parseInt(
            configService.get<string>("queue.redis.db"));

        const bullOptions: Bull.QueueOptions = {
          redis: {
            name: "root-redis",
            host: host,
            port: port,
            password: password,
            db: database,
            enableOfflineQueue: true,
            lazyConnect: false,
          },
          limiter: {
            max: Number.parseInt(
                configService.get<string>("queue.limiter.max")),
            duration: Number.parseInt(
                configService.get<string>("queue.limiter.duration"),
            ),
          },
        };
        return bullOptions;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService, MongoDbTestService],
  exports: [DatabaseService, MongoDbTestService],
})
/**
 * This module is reponsible for configuring the database access.
 */
export class DatabaseModule {}
