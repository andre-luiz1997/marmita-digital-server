
import { REPOSITORIES } from '@/constants';
import { BaseRepository } from '@/shared/repository';
import { Inject, Injectable } from '@nestjs/common';
import { Group } from '../entities';
import { CreateGroupDTO } from '@/application/dtos/groups/create-group.dto';
import { UpdateGroupDTO } from '@/application/dtos/groups/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @Inject(REPOSITORIES.GROUP) private readonly repository: BaseRepository<Group>
  ) {}

  async create(data: CreateGroupDTO) {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateGroupDTO) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async find() {
    return this.repository.find();
  }
}
