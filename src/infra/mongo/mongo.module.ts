import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, PROVIDERS } from "@/constants";
import { UserMongoModel } from "./models/user-mongo.model";
import { UserMongoRepository } from "./repositories/user.repository";
import { userServiceProviders } from "./service-providers/user.serviceprovider";

function getMongooseConnectionString () {
  const user = DB_USER ? `${DB_USER}:${DB_PASS}@` : '';
  return `mongodb://${user}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: PROVIDERS.USER, schema: UserMongoModel}
    ]),
    MongooseModule.forRoot(getMongooseConnectionString())
  ],
  providers: [
    ...userServiceProviders,
    UserMongoRepository
  ],
  exports: [
    ...userServiceProviders,
    UserMongoRepository
  ]
})
export class MongoModule { }