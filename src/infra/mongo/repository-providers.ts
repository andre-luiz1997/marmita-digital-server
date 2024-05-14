import { UserMongoRepository } from "@/data/remote/mongo/user-mongo.repository";
import { UserRepository } from "@/core/repositories/user.repository";
import { TenantRepository } from "core/repositories";
import { TenantMongoRepository } from "data/remote/mongo/tenant-mongo.repository";

export const repositoriesProviders = [
  {
    provide: UserRepository,
    useClass: UserMongoRepository
  },
  {
    provide: TenantRepository,
    useClass: TenantMongoRepository
  }
]