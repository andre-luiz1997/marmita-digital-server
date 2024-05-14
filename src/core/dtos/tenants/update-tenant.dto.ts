import { CreateTenantDTO } from "./create-tenant.dto";
import { PartialType } from '@nestjs/swagger';

export class UpdateTenantDTO extends PartialType(CreateTenantDTO) { }