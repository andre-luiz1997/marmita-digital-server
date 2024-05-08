
import { REPOSITORIES } from '@/constants';
import { BaseRepository } from '@/shared/repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDTO } from '@/core/dtos/groups/create-group.dto';
import { UpdateGroupDTO } from '@/core/dtos/groups/update-group.dto';
import { GroupRepository } from '@/core/repositories/group.repository';
import { CreateGroupMapper } from '@/core/domain/mappers/groups/create-group.mapper';
import { UpdateGroupMapper } from '@/core/domain/mappers/groups/update-group.mapper';
import { CreateGroupUseCase, DeleteGroupUseCase, FindAllGroupsUseCase, FindGroupByIdUseCase, UpdateGroupUseCase } from './use-cases';

@Injectable()
export class GroupsService {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
    private readonly deleteGroupUseCase: DeleteGroupUseCase,
    private readonly findGroupByIdUseCase: FindGroupByIdUseCase,
    private readonly findAllGroupsUseCase: FindAllGroupsUseCase,
  ) {}

  async create(data: CreateGroupDTO) {
    return this.createGroupUseCase.execute(data);
  }

  async update(id: string, data: UpdateGroupDTO) {
    return this.updateGroupUseCase.execute(id, data);
  }

  async delete(id: string) {
    return this.deleteGroupUseCase.execute(id);
  }

  async findOneById(id: string) {
    return this.findGroupByIdUseCase.execute(id);
  }

  async find() {
    return this.findAllGroupsUseCase.execute();
  }
}
