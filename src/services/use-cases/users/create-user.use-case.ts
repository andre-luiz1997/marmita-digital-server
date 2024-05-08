import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base/use-case";
import { UserEntity } from "core/domain/entities";
import { CreateUserMapper } from "core/domain/mappers";
import { CreateUserDTO } from "core/dtos";
import { GroupRepository } from "core/repositories/group.repository";
import { UserRepository } from "core/repositories/user.repository";
import { RecordNotFoundException } from "shared/exceptions";

@Injectable()
export class CreateUserUseCase implements UseCase<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository
  ) { }
  
  async execute(data: CreateUserDTO): Promise<UserEntity> {
    const mapper = new CreateUserMapper();
    const existingGroup = await this.groupRepository.findOneById(data.groupId);
    if (!existingGroup) throw new RecordNotFoundException('group', 'id', data.groupId);
    const item = mapper.mapFrom(data);
    item.group = existingGroup;
    const user = await this.userRepository.create(item)
    return this.userRepository.findOneById(user._id);
  }
}