import { TenantEntity } from "core/domain/entities";
import { MongoRepository } from "./mongo.repository";
import { TenantRepository } from "core/repositories";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ENTITIES } from "@/constants";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";

@Injectable()
export class TenantMongoRepository extends MongoRepository<TenantEntity> implements TenantRepository {
  constructor(
    // @ts-ignore
    @InjectModel(ENTITIES.TENANT) model: SoftDeleteModel<TenantEntity>
  ) {
    super(model);
  }
}