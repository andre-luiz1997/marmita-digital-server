import { Mapper } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { UpdateTenantDTO } from "core/dtos";

export class UpdateTenantMapper extends Mapper<UpdateTenantDTO, TenantEntity> {
  mapFrom(param: UpdateTenantDTO): TenantEntity {
    const tenant = new TenantEntity()
    tenant.name = param.name
    tenant.status = param.status
    return tenant
  }

  mapTo(param: TenantEntity): UpdateTenantDTO {
    const tenant = new UpdateTenantDTO()
    tenant.name = param.name
    tenant.status = param.status
    return tenant
  }
}