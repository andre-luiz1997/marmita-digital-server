import { Mapper } from "core/base";
import { PlanEntity } from "core/domain/entities";
import { CreatePlanDTO } from "core/dtos";

export class CreatePlanMapper implements Mapper<CreatePlanDTO, PlanEntity> {
  mapFrom(param: CreatePlanDTO): PlanEntity {
    const plan = new PlanEntity();
    plan.name = param.name;
    plan.description = param.description;
    plan.featured = param.featured;
    plan.status = param.status;
    plan.pricing = param.pricing;
    return plan;
  }

  mapTo(param: PlanEntity): CreatePlanDTO {
    const plan = new CreatePlanDTO();
    plan.name = param.name;
    plan.description = param.description;
    plan.featured = param.featured;
    plan.status = param.status;
    plan.pricing = param.pricing;
    return plan;
  }
  
}