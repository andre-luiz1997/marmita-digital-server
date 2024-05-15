import { Repository } from "core/base";
import { PlanEntity } from "core/domain/entities/plan.entity";

export abstract class PlanRepository extends Repository<PlanEntity>{}