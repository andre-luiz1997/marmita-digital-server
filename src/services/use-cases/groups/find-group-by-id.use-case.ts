import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { GroupEntity } from "core/domain/entities";
import { GroupRepository } from "core/repositories/group.repository";

@Injectable()
export class FindGroupByIdUseCase implements UseCase<GroupEntity> {
  constructor(
    private groupRepository: GroupRepository
  ) { }

  execute(_id: string): Promise<GroupEntity> {
    return this.groupRepository.findOneById(_id);
  }
}