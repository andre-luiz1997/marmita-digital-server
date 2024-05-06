import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, PROVIDERS } from "@/constants";
import { UserMongoModel, GroupMongoModel } from "./models";
import { UserMongoRepository, GroupMongoRepository } from "./repositories";
import { serviceProviders } from "./service-providers";
import { repositoriesProviders } from "./repositories/repository-providers";

function getMongooseConnectionString () {
  const user = DB_USER ? `${DB_USER}:${DB_PASS}@` : '';
  return `mongodb://${user}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: PROVIDERS.GROUP, schema: GroupMongoModel},
      {name: PROVIDERS.USER, schema: UserMongoModel},
    ]),
    MongooseModule.forRoot(getMongooseConnectionString())
  ],
  providers: [
    ...repositoriesProviders,
    ...serviceProviders
  ],
  exports: [
    ...repositoriesProviders,
    ...serviceProviders
  ]
})
export class MongoModule { }