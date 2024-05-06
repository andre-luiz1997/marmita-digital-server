import { UserService } from "@/domain/services/user.service";
import { UserMongoRepository } from "../repositories/user.repository";
import { SERVICES } from "@/constants";
import { AuthService } from "@/domain/services/auth.service";
import {JwtService} from '@nestjs/jwt';

export const serviceProviders = [
  {
    provide: SERVICES.AUTH,
    useFactory: (
      userRepository: UserMongoRepository,
      jwtService: JwtService
    ) => new AuthService(userRepository, jwtService),
    inject: [UserMongoRepository, JwtService]
  },
  {
    provide: SERVICES.USER,
    useFactory: (userRepository: UserMongoRepository) => new UserService(userRepository),
    inject: [UserMongoRepository]
  }
]