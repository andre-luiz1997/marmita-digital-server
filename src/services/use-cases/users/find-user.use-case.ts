import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base/use-case";
import { UserEntity, UserWithoutPassword } from "core/domain/entities";
import { UserRepository } from "core/repositories/user.repository";

@Injectable()
export class FindUserUseCase implements UseCase<UserEntity | UserWithoutPassword> {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }
  
  async execute(filter: any, omitPassword = true): Promise<UserEntity | UserWithoutPassword> {
    return this.userRepository.findOne(filter, omitPassword);
  }
}