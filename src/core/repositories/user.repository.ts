import { Repository } from "../base";
import { UserEntity } from "../domain/entities/auth/user.entity";

export abstract class UserRepository extends Repository<UserEntity> {}