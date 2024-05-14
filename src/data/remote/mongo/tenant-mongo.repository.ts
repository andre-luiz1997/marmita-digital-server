import { TenantEntity } from "core/domain/entities";
import { MongoRepository } from "./mongo.repository";
import { TenantRepository } from "core/repositories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ENTITIES } from "@/constants";
import { Model } from "mongoose";

@Injectable()
export class TenantMongoRepository extends MongoRepository<TenantEntity> implements TenantRepository {
  constructor(
    @InjectModel(ENTITIES.TENANT) model: Model<TenantEntity>
  ) {
    super(model);
  }
}