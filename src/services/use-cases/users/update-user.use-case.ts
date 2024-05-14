import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base/use-case";
import { UserEntity } from "core/domain/entities";
import { CreateUserMapper, UpdateUserMapper } from "core/domain/mappers";
import { UpdateUserDTO } from "core/dtos";
import { UserRepository } from "core/repositories/user.repository";
import { RecordNotFoundException } from "shared/exceptions";

@Injectable()
export class UpdateUserUseCase implements UseCase<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository
  ) { }
  
  async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const mapper = new UpdateUserMapper();
    const item = mapper.mapFrom(data);
    const user = await this.userRepository.update(id, item);
    return this.userRepository.findOneById(user._id);
  }
}