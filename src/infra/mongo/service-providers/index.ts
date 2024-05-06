import { UserService } from "@/domain/services/user.service";
import { GroupMongoRepository, UserMongoRepository } from "../repositories";

import { AuthService } from "@/domain/services/auth.service";
import { JwtService } from '@nestjs/jwt';
import { GroupService } from "@/domain/services/group.service";
import { SERVICES } from "@/constants";

export const serviceProviders = [
  {
    provide: SERVICES.AUTH,
    useFactory: (
      userService: UserService,
      userRepository: UserMongoRepository,
      jwtService: JwtService
    ) => new AuthService(userService, userRepository, jwtService),
    inject: [UserService, UserMongoRepository, JwtService]
  },
  {
    provide: SERVICES.USER,
    useFactory: (
      userRepository: UserMongoRepository,
      groupRepository: GroupMongoRepository
    ) => new UserService(userRepository, groupRepository),
    inject: [UserMongoRepository]
  },
  {
    provide: SERVICES.GROUP,
    useFactory: (groupRepository: GroupMongoRepository) => new GroupService(groupRepository),
    inject: [GroupMongoRepository]
  },
]