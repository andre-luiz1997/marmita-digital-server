import { Mapper } from "@/core/base/mapper";
import { UserEntity } from "../../entities";
import { CreateUserDTO } from "@/core/dtos";

export class CreateUserMapper extends Mapper<CreateUserDTO, UserEntity> {

  mapFrom(param: CreateUserDTO): UserEntity {
    const user = new UserEntity();
    user.email = param.email;
    user.password = param.password;
    user.name = param.name;
    // user.group = param.group;
    user.status = 'active';
    user.createdAt = new Date();
    return user;
  }
  mapTo(param: UserEntity): CreateUserDTO {
    const user = new CreateUserDTO();
    user.email = param.email;
    user.password = param.password;
    user.name = param.name;
    return user;
  }
}