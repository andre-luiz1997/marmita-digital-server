import { Mapper } from "@/core/base/mapper";
import { UserEntity } from "../../entities";
import { UpdateUserDTO } from "core/dtos/users/update-user.dto";

export class UpdateUserMapper extends Mapper<UpdateUserDTO, UserEntity> {

  mapFrom(param: UpdateUserDTO): UserEntity {
    const user = new UserEntity();
    if(param.email) user.email = param.email;
    if(param.password) user.password = param.password;
    if(param.name) user.name = param.name;
    if(param.group) user.group = param.group;
    if(param.mobile_phone) user.mobile_phone = param.mobile_phone;
    if(param.status) user.status = param.status;
    if(param.tenant) user.tenant = param.tenant;
    return user;
  }
  mapTo(param: UserEntity): UpdateUserDTO {
    const user = new UpdateUserDTO();
    user.email = param.email;
    user.password = param.password;
    user.name = param.name;
    user.group = param.group;
    user.mobile_phone = param.mobile_phone;
    user.tenant = param.tenant;
    return user;
  }
}