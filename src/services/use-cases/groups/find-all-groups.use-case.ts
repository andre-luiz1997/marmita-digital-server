import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { GroupEntity } from "core/domain/entities";
import { GroupRepository } from "core/repositories/group.repository";

@Injectable()
export class FindAllGroupsUseCase implements UseCase<Array<GroupEntity>> {
  constructor(
    private groupRepository: GroupRepository
  ) { }

  execute(): Promise<Array<GroupEntity>> {
    return this.groupRepository.findAll();
  }
}