import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { PlanEntity } from "core/domain/entities";
import { PlanRepository } from "core/repositories";

@Injectable()
export class FindPlanUseCase implements UseCase<PlanEntity> {
  constructor(
    private readonly repository: PlanRepository,
  ) { }
  
  async execute(filter: any): Promise<PlanEntity> {
    return this.repository.findOne(filter);
  }
}