import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { GroupEntity } from "core/domain/entities";
import { CreateGroupMapper } from "core/domain/mappers";
import { CreateGroupDTO } from "core/dtos";
import { GroupRepository } from "core/repositories/group.repository";

@Injectable()
export class CreateGroupUseCase implements UseCase<GroupEntity> {
  constructor(
    private groupRepository: GroupRepository
  ) { }

  execute(data: CreateGroupDTO): Promise<GroupEntity> {
    const mapper = new CreateGroupMapper();
    return this.groupRepository.create(mapper.mapFrom(data));
  }
}