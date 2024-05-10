import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { GroupEntity } from "core/domain/entities";
import { GroupRepository } from "core/repositories/group.repository";

@Injectable()
export class GetDefaultGroupUseCase implements UseCase<GroupEntity> {
  constructor(
    private groupRepository: GroupRepository
  ) { }

  execute(): Promise<GroupEntity> {
    return this.groupRepository.findOne({default: true});
  }
}