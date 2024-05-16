import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { PlanEntity } from "core/domain/entities";
import { CreatePlanMapper } from "core/domain/mappers/plans/create-plan.mapper";
import { CreatePlanDTO } from "core/dtos";
import { PlanRepository } from "core/repositories";

@Injectable()
export class CreatePlanUseCase implements UseCase<PlanEntity> {
  constructor(
    private readonly planRepository: PlanRepository
  ) { }

  async execute(data: CreatePlanDTO): Promise<PlanEntity> {
    const mapper = new CreatePlanMapper();
    const item = mapper.mapFrom(data);
    const plan = await this.planRepository.create(item);
    if (plan.featured) await this.planRepository.updateMany({ featured: true, _id: { $ne: plan._id } }, { featured: false });
    return plan;
  }

}