import { Mapper } from "core/base";
import { TenantEntity } from "core/domain/entities";
import { CreateTenantDTO } from "core/dtos";

export class CreateTenantMapper extends Mapper<CreateTenantDTO, TenantEntity> {
  mapFrom(param: CreateTenantDTO): TenantEntity {
    const tenant = new TenantEntity()
    tenant.name = param.name
    return tenant
  }

  mapTo(param: TenantEntity): CreateTenantDTO {
    const tenant = new CreateTenantDTO()
    tenant.name = param.name
    return tenant
  }
  
}
