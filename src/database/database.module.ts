import {Module} from "@nestjs/common";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {DatabaseService} from "./database/database.service";
import {MongoDbTestService} from "./mongo-dbtest/mongo-db-test.service";

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

        let mongoDBUri: string = "mongodb+srv://" + username + ":" + password + "@" + dbHost + ":" + dbPort + "/" + dbDatabase + "?retryWrites=" + retryWrites + "&w=" + w + "";

        if (configService.get<string>("NODE_ENV") === "test") {
          const mongoDbTestService = new MongoDbTestService();
          mongoDBUri = await mongoDbTestService.createInMemoryInstance();
          console.info("use mongodb test instance: " + mongoDBUri);
        }

        const options: MongooseModuleOptions = {
          uri: mongoDBUri,
          connectionName: "root",
        };
        return options;
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
