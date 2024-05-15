import { Injectable } from "@nestjs/common";
import { CreatePlanDTO, UpdatePlanDTO } from "core/dtos";
import { CreatePlanUseCase, DeletePlanUseCase, FindAllPlansUseCase, FindPlanByIdUseCase, FindPlanUseCase, UpdatePlanUseCase } from "./use-cases";
import { PaginationProps } from "shared/types";

@Injectable()
export class PlansService {
  constructor(
    private readonly createPlanUseCase: CreatePlanUseCase,
    private readonly findPlanUseCase: FindPlanUseCase,
    private readonly findPlanByIdUseCase: FindPlanByIdUseCase,
    private readonly findAllPlansUseCase: FindAllPlansUseCase,
    private readonly updatePlanUseCase: UpdatePlanUseCase,
    private readonly deletePlanUseCase: DeletePlanUseCase,
  ) { }

  async create(data: CreatePlanDTO) {
    return this.createPlanUseCase.execute(data);
  }

  async findOne(filter: any) {
    return this.findPlanUseCase.execute(filter);
  }

  async findOneById(_id: any) {
    return this.findPlanByIdUseCase.execute(_id);
  }

  async findAll(pagination?: PaginationProps) {
    return this.findAllPlansUseCase.execute(pagination);
  }

  async update(_id: any, data: UpdatePlanDTO) {
    return this.updatePlanUseCase.execute(_id, data);
  }

  async delete(_id: any) {
    return this.deletePlanUseCase.execute(_id);
  }
}