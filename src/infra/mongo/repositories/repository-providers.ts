import { REPOSITORIES } from "@/constants";
import { UserMongoRepository } from "./user.repository";
import { GroupMongoModel, UserMongoModel } from "../models";
import { Model } from "mongoose";
import { Group, User } from "@/domain/entities";
import { GroupMongoRepository } from "./group.repository";

export const repositoriesProviders = [
  {
    provide: REPOSITORIES.USER,
    useFactory: (
      model: Model<User>,
    ) => new UserMongoRepository(model),
    inject: [UserMongoModel]
  },
  {
    provide: REPOSITORIES.GROUP,
    useFactory: (
      model: Model<Group>,
    ) => new GroupMongoRepository(model),
    inject: [GroupMongoModel]
  },
]