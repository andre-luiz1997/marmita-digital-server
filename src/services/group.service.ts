
import { REPOSITORIES } from '@/constants';
import { BaseRepository } from '@/shared/repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDTO } from '@/core/dtos/groups/create-group.dto';
import { UpdateGroupDTO } from '@/core/dtos/groups/update-group.dto';
import { GroupRepository } from '@/core/repositories/group.repository';
import { CreateGroupMapper } from '@/core/domain/mappers/groups/create-group.mapper';
import { UpdateGroupMapper } from '@/core/domain/mappers/groups/update-group.mapper';

@Injectable()
export class GroupsService {
  constructor(
    private readonly repository: GroupRepository
  ) {}

  async create(data: CreateGroupDTO) {
    const mapper = new CreateGroupMapper();
    return this.repository.create(mapper.mapFrom(data));
  }

  async update(id: string, data: UpdateGroupDTO) {
    const mapper = new UpdateGroupMapper();
    return this.repository.update(id, mapper.mapFrom(data));
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async findOneById(id: string) {
    return this.repository.findOneById(id);
  }

  async find() {
    return this.repository.findAll();
  }
}
