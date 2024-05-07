import { PROVIDERS } from "@/constants";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { MongoRepository } from "./mongo.repository";
import { GroupEntity } from "@/core/domain/entities";
import { GroupRepository } from "@/core/repositories/group.repository";

@Injectable()
export class GroupMongoRepository extends MongoRepository<GroupEntity> implements GroupRepository {
  constructor(
    @InjectModel(GroupEntity.name) model: Model<GroupEntity>
  ) {
    super(model);
  }
}