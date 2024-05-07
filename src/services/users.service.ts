import { RecordNotFoundException } from '@/shared/exceptions';
import { CreateUserMapper } from '@/core/domain/mappers/users/create-user.mapper';
import { CreateUserDTO } from '@/core/dtos';
import { GroupRepository } from '@/core/repositories/group.repository';
import { UserRepository } from '@/core/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'core/domain/entities';
import { UpdateUserDTO } from 'core/dtos/users/udate-user.dto';
import { UpdateUserMapper } from 'core/domain/mappers/users/update-user.mapper';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository
  ) { }

  async create(data: CreateUserDTO) {
    const mapper = new CreateUserMapper();
    const existingGroup = await this.groupRepository.findOneById(data.groupId);
    if (!existingGroup) throw new RecordNotFoundException('group', 'id', data.groupId);
    const item = mapper.mapFrom(data);
    item.group = existingGroup;
    const user = await this.userRepository.create(item)
    return this.findOneById(user._id);
  }

  async findOne(filter: any): Promise<UserEntity>;
  async findOne(filter: any, omitPassword: false): Promise<UserEntity>;
  async findOne(filter: any, omitPassword: true): Promise<Omit<UserEntity, 'password'>>;
  async findOne(filter: any, omitPassword = true) {
    const item = await this.userRepository.findOne(filter);
    if (!item) return undefined;
    if (!omitPassword) return item;
    const { password, ...rest } = item;
    return rest;
  }

  async findOneById(_id: any): Promise<UserEntity>;
  async findOneById(_id: any, omitPassword: true): Promise<Omit<UserEntity, 'password'>>;
  async findOneById(_id: any, omitPassword = true) {
    const item = await this.userRepository.findOneById(_id);
    if (!item) return undefined;
    if (!omitPassword) return item;
    const { password, ...rest } = item;
    return rest;
  }

  async findAll(): Promise<UserEntity[]>;
  async findAll(omitPassword?: true): Promise<Omit<UserEntity, 'password'>[]>;
  async findAll(omitPassword = true) {
    const items = await this.userRepository.findAll();
    if (!items) return [];
    if (!omitPassword) return items;
    return items.map(({ password, ...rest }) => rest);
  }

  async update(id: string, data: UpdateUserDTO) {
    const mapper = new UpdateUserMapper();
    const existingGroup = await this.groupRepository.findOneById(data.groupId);
    if (data.groupId && !existingGroup) throw new RecordNotFoundException('group', 'id', data.groupId);
    const item = mapper.mapFrom(data);
    if (data.groupId) item.group = existingGroup;
    const user = await this.userRepository.update(id, item);
    return this.findOneById(user._id);
  }
}
