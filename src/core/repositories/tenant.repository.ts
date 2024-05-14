import { Repository } from "core/base";
import { TenantEntity } from "core/domain/entities";

export abstract class TenantRepository extends Repository<TenantEntity>{}