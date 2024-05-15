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
  ) {}

  execute(data: CreatePlanDTO): Promise<PlanEntity> {
    const mapper = new CreatePlanMapper();
    const item = mapper.mapFrom(data);
    return this.planRepository.create(item);
  }

}