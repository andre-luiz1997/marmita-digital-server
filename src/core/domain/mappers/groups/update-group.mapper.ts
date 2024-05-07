import { CreateGroupDTO, UpdateGroupDTO } from "@/core/dtos";
import { GroupEntity } from "@/core/domain/entities";
import { Mapper } from "@/core/base/mapper";

export class UpdateGroupMapper extends Mapper<UpdateGroupDTO, GroupEntity> {

  mapFrom(param: UpdateGroupDTO): GroupEntity {
    const group = new GroupEntity();
    group.name = param.name;
    group.permissions = param.permissions;
    group.createdAt = new Date();
    return group;
  }
  mapTo(param: GroupEntity): UpdateGroupDTO {
    const group = new UpdateGroupDTO();
    group.name = param.name;
    group.permissions = param.permissions;
    return group;
  }
}