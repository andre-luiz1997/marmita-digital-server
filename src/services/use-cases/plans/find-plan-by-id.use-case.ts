import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base/use-case";
import { PlanEntity } from "core/domain/entities";
import { PlanRepository } from "core/repositories";

@Injectable()
export class FindPlanByIdUseCase implements UseCase<PlanEntity> {
  constructor(
    private readonly repository: PlanRepository,
  ) { }
  
  async execute(_id: any): Promise<PlanEntity> {
    return this.repository.findOneById(_id);
  }
}