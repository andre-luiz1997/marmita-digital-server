import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "core/domain/entities";
import { TransactionRepository } from "core/repositories";
import { MongoRepository } from "./mongo.repository";
import { ENTITIES } from "@/constants";
import { InjectModel } from "@nestjs/mongoose";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { PaginationProps } from "shared/types";

@Injectable()
export class TransactionMongoRepository extends MongoRepository<TransactionEntity> implements TransactionRepository {
  constructor(
    // @ts-ignore
    @InjectModel(ENTITIES.TRANSACTION) model: SoftDeleteModel<TransactionEntity>
  ) {
    super(model);
  }

  async findAll(props?: PaginationProps) {
    const query = this.model.find().populate<TransactionEntity>([
      {
        path: 'tenant',
        model: ENTITIES.TENANT
      },
      {
        path: 'plan',
        model: ENTITIES.PLAN
      },
    ])
    if (props) this.preparePagination(query, props);
    return {
      data: await query.exec(),
      count: await this.model.countDocuments(query.getOptions())
    };
  }
}