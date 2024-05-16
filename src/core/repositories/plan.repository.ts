import { Repository } from "core/base";
import { PlanEntity } from "core/domain/entities/saas/plan.entity";

export abstract class PlanRepository extends Repository<PlanEntity>{}