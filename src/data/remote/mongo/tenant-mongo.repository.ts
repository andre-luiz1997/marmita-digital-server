import { TenantEntity } from "core/domain/entities";
import { MongoRepository } from "./mongo.repository";
import { TenantRepository } from "core/repositories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ENTITIES } from "@/constants";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { PaginationProps } from "shared/types";

@Injectable()
export class TenantMongoRepository extends MongoRepository<TenantEntity> implements TenantRepository {
  constructor(
    // @ts-ignore
    @InjectModel(ENTITIES.TENANT) model: SoftDeleteModel<TenantEntity>
  ) {
    super(model);
  }

  async findAll(props?: PaginationProps) {
    const query = this.model.find();
    if(props) this.preparePagination(query, props);
    return {
      data: await query.exec(),
      count: await this.model.countDocuments(query.getOptions())
    };
  }
}