import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { GroupRepository } from "core/repositories/group.repository";

@Injectable()
export class DeleteGroupUseCase implements UseCase<void> {
  constructor(
    private groupRepository: GroupRepository
  ) { }

  execute(_id: string): Promise<void> {
    return this.groupRepository.delete(_id);
  }
}