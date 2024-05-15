import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { PlanEntity } from "core/domain/entities";
import { PlanRepository } from "core/repositories";
import { PaginationProps } from "shared/types";

@Injectable()
export class FindAllPlansUseCase implements UseCase<{data: PlanEntity[], count: number}> {
  constructor(
    private readonly repository: PlanRepository,
  ) {}

  async execute(props?: PaginationProps): Promise<{data: PlanEntity[], count: number}> {
    return this.repository.findAll(props);
  }
}