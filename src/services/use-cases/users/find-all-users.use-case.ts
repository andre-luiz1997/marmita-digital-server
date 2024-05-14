import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base/use-case";
import { UserEntity, UserWithoutPassword } from "core/domain/entities";
import { UserRepository } from "core/repositories/user.repository";
import { PaginationProps } from "shared/types";

@Injectable()
export class FindAllUsersUseCase implements UseCase<{data: Array<UserEntity | UserWithoutPassword>, count: number}> {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }
  
  async execute(props: PaginationProps & { omitPassword?: boolean }): Promise<{data: Array<UserEntity | UserWithoutPassword>, count: number}> {
    return this.userRepository.findAll(props);
  }
}