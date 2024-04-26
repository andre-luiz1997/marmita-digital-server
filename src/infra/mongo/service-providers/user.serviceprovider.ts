import { UserService } from "@/domain/services/user.service";
import { UserMongoRepository } from "../repositories/user.repository";
import { SERVICES } from "@/constants";

export const userServiceProviders = [
  {
    provide: SERVICES.USER,
    useFactory: (userRepository: UserMongoRepository) => new UserService(userRepository),
    inject: [UserMongoRepository]
  }
]