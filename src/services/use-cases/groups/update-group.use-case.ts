import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { GroupEntity } from "core/domain/entities";
import { UpdateGroupMapper } from "core/domain/mappers";
import { UpdateGroupDTO } from "core/dtos";
import { GroupRepository } from "core/repositories/group.repository";

@Injectable()
export class UpdateGroupUseCase implements UseCase<GroupEntity> {
  constructor(
    private groupRepository: GroupRepository
  ) { }

  execute(id: string, data: UpdateGroupDTO): Promise<GroupEntity> {
    const mapper = new UpdateGroupMapper();
    return this.groupRepository.update(id, mapper.mapFrom(data));
  }
}