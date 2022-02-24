import {Test, TestingModule} from "@nestjs/testing";
import {Gender, UserService} from "./user.service";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";
import {User, UserDocument, UserSchema} from "../user-schema";
import {MongoMemoryServer} from "mongodb-memory-server";
import {MongoDbTestService}
  from "../../database/mongo-dbtest/mongo-db-test.service";
import {DatabaseModule} from "../../database/database.module";
import {Connection} from "mongoose";
import {DatabaseService} from "../../database/database/database.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../../config/configuration";

