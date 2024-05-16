import { Mapper } from "core/base";
import { PlanEntity } from "core/domain/entities";
import { UpdatePlanDTO } from "core/dtos";

export class UpdatePlanMapper implements Mapper<UpdatePlanDTO, PlanEntity> {
  mapFrom(param: UpdatePlanDTO): PlanEntity {
    const plan = new PlanEntity();
    plan.name = param.name;
    plan.description = param.description;
    plan.featured = param.featured;
    plan.status = param.status;
    plan.pricing = param.pricing;
    return plan;
  }

  mapTo(param: PlanEntity): UpdatePlanDTO {
    const plan = new UpdatePlanDTO();
    plan.name = param.name;
    plan.description = param.description;
    plan.featured = param.featured;
    plan.status = param.status;
    plan.pricing = param.pricing;
    return plan;
  }
  
}