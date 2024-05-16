import { Injectable } from "@nestjs/common";
import { MongoRepository } from "./mongo.repository";
import { SubscriptionEntity } from "core/domain/entities";
import { SubscriptionRepository } from "core/repositories";
import { ENTITIES } from "@/constants";
import { InjectModel } from "@nestjs/mongoose";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { PaginationProps } from "shared/types";

@Injectable()
export class SubscriptionMongoRepository extends MongoRepository<SubscriptionEntity> implements SubscriptionRepository {
  constructor(
    // @ts-ignore
    @InjectModel(ENTITIES.SUBSCRIPTION) model: SoftDeleteModel<SubscriptionEntity>
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