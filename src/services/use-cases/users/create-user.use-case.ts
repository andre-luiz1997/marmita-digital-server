import { Injectable } from "@nestjs/common";
import { isEmpty } from "class-validator";
import { UseCase } from "core/base/use-case";
import { GroupEntity, UserEntity } from "core/domain/entities";
import { CreateUserMapper } from "core/domain/mappers";
import { CreateUserDTO } from "core/dtos";
import { GroupRepository } from "core/repositories/group.repository";
import { UserRepository } from "core/repositories/user.repository";
import { RecordNotFoundException, ValidationException } from "shared/exceptions";
import { GetDefaultGroupUseCase } from "../groups";

@Injectable()
export class CreateUserUseCase implements UseCase<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
    private readonly getDefaultGroupUseCase: GetDefaultGroupUseCase
  ) { }
  
  async execute(data: CreateUserDTO): Promise<UserEntity> {
    const mapper = new CreateUserMapper();
    if(isEmpty(data.email) && isEmpty(data.mobile_phone)) throw new ValidationException('Missing email or mobile_phone');
    let existingGroup: GroupEntity;
    if(isEmpty(data.groupId)) existingGroup = await this.getDefaultGroupUseCase.execute();
    else existingGroup = await this.groupRepository.findOneById(data.groupId);
    if (!existingGroup) throw new RecordNotFoundException('group', 'id', data.groupId);
    const item = mapper.mapFrom(data);
    item.group = existingGroup;
    const user = await this.userRepository.create(item)
    return this.userRepository.findOneById(user._id);
  }
}