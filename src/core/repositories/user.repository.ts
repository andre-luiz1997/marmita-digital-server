import { Repository } from "../base";
import { UserEntity } from "../domain/entities/auth/user.entity";

export abstract class UserRepository extends Repository<UserEntity> {
  abstract findOneById(_id: any, omitPassword?: boolean): Promise<UserEntity>;
  abstract findAll(omitPassword?: boolean): Promise<UserEntity[]>;
  abstract findOne(filter: any, omitPassword?: boolean): Promise<UserEntity>;
  abstract findMany(filter: any, omitPassword?: boolean): Promise<UserEntity[]>;
}