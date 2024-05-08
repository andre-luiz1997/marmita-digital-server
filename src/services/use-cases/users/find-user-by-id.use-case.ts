import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base/use-case";
import { UserEntity, UserWithoutPassword } from "core/domain/entities";
import { UserRepository } from "core/repositories/user.repository";

@Injectable()
export class FindUserByIdUseCase implements UseCase<UserEntity | UserWithoutPassword> {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }
  
  async execute(_id: any, omitPassword = true): Promise<UserEntity | UserWithoutPassword> {
    return this.userRepository.findOneById(_id, omitPassword);
  }
}