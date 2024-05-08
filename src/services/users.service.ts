import { CreateUserDTO } from '@/core/dtos';
import { Injectable } from '@nestjs/common';
import { UserEntity, UserWithoutPassword } from 'core/domain/entities';
import { UpdateUserDTO } from 'core/dtos/users/update-user.dto';
import { CreateUserUseCase, FindAllUsersUseCase, FindUserByIdUseCase, FindUserUseCase, UpdateUserUseCase } from './use-cases';


@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
  ) { }

  async create(data: CreateUserDTO) {
    return this.createUserUseCase.execute(data);
  }

  async findOne(filter: any): Promise<UserEntity>;
  async findOne(filter: any, omitPassword: false): Promise<UserEntity>;
  async findOne(filter: any, omitPassword: true): Promise<UserWithoutPassword>;
  async findOne(filter: any, omitPassword = true) {
    return this.findUserUseCase.execute(filter, omitPassword);
  }

  async findOneById(_id: any): Promise<UserEntity>;
  async findOneById(_id: any, omitPassword: true): Promise<UserWithoutPassword>;
  async findOneById(_id: any, omitPassword = true) {
    return this.findUserByIdUseCase.execute(_id, omitPassword);
  }

  async findAll(): Promise<UserEntity[]>;
  async findAll(omitPassword?: true): Promise<UserWithoutPassword[]>;
  async findAll(omitPassword = true) {
    return this.findAllUsersUseCase.execute(omitPassword);
  }

  async update(id: string, data: UpdateUserDTO) {
    return this.updateUserUseCase.execute(id, data);
  }
}
