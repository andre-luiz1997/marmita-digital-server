import { Injectable } from "@nestjs/common";
import { MongoRepository } from "./mongo.repository";
import { PlanEntity } from "core/domain/entities";
import { PlanRepository } from "core/repositories";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { PaginationProps } from "shared/types";
import { InjectModel } from "@nestjs/mongoose";
import { ENTITIES } from "@/constants";

@Injectable()
export class PlanMongoRepository extends MongoRepository<PlanEntity> implements PlanRepository {
  constructor(
    //@ts-ignore
    @InjectModel(ENTITIES.PLAN) model: SoftDeleteModel<PlanEntity>
  ) {
    super(model);
  }

  async findAll(props?: PaginationProps) {
    const query = this.model.find();
    if (props) this.preparePagination(query, props);
    return {
      data: await query.exec(),
      count: await this.model.countDocuments(query.getOptions())
    };
  }
}