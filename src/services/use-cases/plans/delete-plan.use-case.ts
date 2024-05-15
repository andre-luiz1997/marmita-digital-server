import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { PlanEntity } from "core/domain/entities";
import { PlanRepository } from "core/repositories";

@Injectable()
export class DeletePlanUseCase implements UseCase<PlanEntity> {
  constructor(
    private readonly repository: PlanRepository,
  ) { }

  async execute(_id: any) {
    await this.repository.delete(_id)
    const item = await this.repository.findOneById(_id);
    return item;
  }
}