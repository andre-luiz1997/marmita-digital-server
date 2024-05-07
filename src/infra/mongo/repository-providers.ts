import { UserMongoRepository } from "@/data/remote/mongo/user-mongo.repository";
import { UserRepository } from "@/core/repositories/user.repository";
import { GroupRepository } from "@/core/repositories/group.repository";
import { GroupMongoRepository } from "@/data/remote/mongo/group-mongo.repository";

export const repositoriesProviders = [
  {
    provide: UserRepository,
    useClass: UserMongoRepository
  },
  {
    provide: GroupRepository,
    useClass: GroupMongoRepository
  },
]