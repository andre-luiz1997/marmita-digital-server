import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { PlanEntity } from "core/domain/entities";
import { UpdatePlanMapper } from "core/domain/mappers/plans/update-plan.mapper";
import { UpdatePlanDTO } from "core/dtos";
import { PlanRepository } from "core/repositories";

@Injectable()
export class UpdatePlanUseCase implements UseCase<PlanEntity> {
  constructor(
    private readonly repository: PlanRepository,
  ) { }

  async execute(_id: any, data: UpdatePlanDTO): Promise<PlanEntity> {
    const mapper = new UpdatePlanMapper();
    const item = mapper.mapFrom(data);
    await this.repository.update(_id, item);
    return this.repository.findOneById(_id);
  }
}