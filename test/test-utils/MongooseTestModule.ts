import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import {ConfigService} from "@nestjs/config";

let mongod: MongoMemoryServer;

// eslint-disable-next-line max-len
export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) => MongooseModule.forRootAsync({
  imports: [ConfigService],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFactory: async (configService: ConfigService) => {
    console.info("start mongodb memory server...");
    mongod = await MongoMemoryServer.create();
    // await mongod.start(false);
    const mongoUri = mongod.getUri();
    console.info("mongodb in-memory server started: " + mongoUri);
    process.env["NODE_ENV"] = "test";
    process.env.MONGODB_TEST_URI = mongoUri;
    console.info("mongoUri: " + mongoUri);
    console.info("MONGODB_TEST_URI: " + process.env.MONGODB_TEST_URI);

    return {
      uri: mongoUri,
      ...options,
    };
  },
  inject: [ConfigService],
});

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
