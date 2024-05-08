import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base/use-case";
import { UserEntity } from "core/domain/entities";
import { CreateUserMapper, UpdateUserMapper } from "core/domain/mappers";
import { UpdateUserDTO } from "core/dtos";
import { GroupRepository } from "core/repositories/group.repository";
import { UserRepository } from "core/repositories/user.repository";
import { RecordNotFoundException } from "shared/exceptions";

@Injectable()
export class UpdateUserUseCase implements UseCase<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository
  ) { }
  
  async execute(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    const mapper = new UpdateUserMapper();
    const existingGroup = await this.groupRepository.findOneById(data.groupId);
    if (data.groupId && !existingGroup) throw new RecordNotFoundException('group', 'id', data.groupId);
    const item = mapper.mapFrom(data);
    if (data.groupId) item.group = existingGroup;
    const user = await this.userRepository.update(id, item);
    return this.userRepository.findOneById(user._id);
  }
}