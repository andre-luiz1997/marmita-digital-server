import { CreateUserDTO } from '@/core/dtos';
import { Injectable } from '@nestjs/common';
import { UserEntity, UserWithoutPassword } from 'core/domain/entities';
import { UpdateUserDTO } from 'core/dtos/users/update-user.dto';
import { CreateUserUseCase, DeleteUserUseCase, FindAllUsersUseCase, FindUserByIdUseCase, FindUserUseCase, UpdateUserUseCase } from './use-cases';
import { PaginationProps } from 'shared/types';


@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
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

  async findAll(props?: PaginationProps & { omitPassword?: boolean }): Promise<{ data: UserEntity[], count: number }>;
  async findAll(props?: PaginationProps & { omitPassword?: false }): Promise<{ data: UserEntity[], count: number }>;
  async findAll(props?: PaginationProps & { omitPassword?: true }): Promise<{ data: UserWithoutPassword[], count: number }>;
  async findAll(props: PaginationProps & { omitPassword?: boolean }) {
    return this.findAllUsersUseCase.execute(props);
  }

  async update(id: string, data: UpdateUserDTO) {
    return this.updateUserUseCase.execute(id, data);
  }

  async delete(id: string) {
    return this.deleteUserUseCase.execute(id);
  }
}
