import { CreateGroupDTO } from "@/core/dtos";
import { GroupEntity } from "@/core/domain/entities";
import { Mapper } from "@/core/base/mapper";

export class CreateGroupMapper extends Mapper<CreateGroupDTO, GroupEntity> {

  mapFrom(param: CreateGroupDTO): GroupEntity {
    const group = new GroupEntity();
    group.name = param.name;
    group.permissions = param.permissions;
    group.createdAt = new Date();
    return group;
  }
  mapTo(param: GroupEntity): CreateGroupDTO {
    const group = new CreateGroupDTO();
    group.name = param.name;
    group.permissions = param.permissions;
    return group;
  }
}