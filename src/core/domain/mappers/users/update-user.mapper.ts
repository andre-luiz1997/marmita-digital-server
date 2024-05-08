import { Mapper } from "@/core/base/mapper";
import { UserEntity } from "../../entities";
import { UpdateUserDTO } from "core/dtos/users/update-user.dto";

export class UpdateUserMapper extends Mapper<UpdateUserDTO, UserEntity> {

  mapFrom(param: UpdateUserDTO): UserEntity {
    const user = new UserEntity();
    user.email = param.email;
    user.password = param.password;
    user.name = param.name;
    // user.group = param.group;
    user.status = 'active';
    user.createdAt = new Date();
    return user;
  }
  mapTo(param: UserEntity): UpdateUserDTO {
    const user = new UpdateUserDTO();
    user.email = param.email;
    user.password = param.password;
    user.name = param.name;
    return user;
  }
}