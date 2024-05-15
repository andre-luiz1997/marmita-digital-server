import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { UserEntity } from "core/domain/entities";
import { UserRepository } from "core/repositories";

@Injectable()
export class DeleteUserUseCase implements UseCase<void> {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  execute(_id: any) {
    return this.userRepository.delete(_id);
  }
}