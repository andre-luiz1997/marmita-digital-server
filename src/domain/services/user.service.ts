import { Inject, Injectable } from "@nestjs/common";
import type { BaseRepository } from "@/shared/repository";
import { User } from "../entities/user";

import type { CreateUserDTO } from "@/application/dtos/users/create-user.dto";
import { UpdateUserDTO } from "@/application/dtos/users/udate-user.dto";
import { Group } from "../entities";
import { RecordNotFoundException } from "@/application/exceptions";
import { REPOSITORIES } from "@/constants";

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORIES.USER) private readonly repository: BaseRepository<User>,
    @Inject(REPOSITORIES.GROUP) private readonly groupRepository: BaseRepository<Group>
  ) {
  }

  async create(data: CreateUserDTO) {
    const existingGroup = await this.groupRepository.findById(data.groupId);
    if(!existingGroup) throw new RecordNotFoundException(Group.name, 'id', data.groupId);
    const {groupId, ...rest} = data;
    console.log('🚀 ~ file: user.service.ts:24 ~ UserService ~ create ~ existingGroup 🚀 ➡➡', existingGroup);
    return this.repository.create({...rest, group: existingGroup});
  }

  async update(id: string, data: UpdateUserDTO) {
    const existingUser = await this.repository.findById(id);
    if(!existingUser) throw new RecordNotFoundException(User.name, 'id', id);
    const groupId = data.groupId ?? existingUser.group._id;
    const existingGroup = await this.groupRepository.findById(groupId);
    if(!existingGroup) throw new RecordNotFoundException(Group.name, 'id', groupId);
    const {groupId: _, ...rest} = data;
    return this.repository.update(id, {...rest, group: existingGroup});
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