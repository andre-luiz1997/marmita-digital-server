import { ENTITIES, PROVIDERS } from "@/constants";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { MongoRepository } from "./mongo.repository";
import { GroupEntity } from "@/core/domain/entities";
import { GroupRepository } from "@/core/repositories/group.repository";
import { ConflictException } from "shared/exceptions";

@Injectable()
export class GroupMongoRepository extends MongoRepository<GroupEntity> implements GroupRepository {
  constructor(
    @InjectModel(ENTITIES.GROUP) model: Model<GroupEntity>
  ) {
    super(model);
  }

  async create(data: GroupEntity): Promise<GroupEntity> {
    const existing = await this.findOne({ name: data.name });
    if (existing) throw new ConflictException('group', 'name', data.name);
    if (data.default) await this.updateMany({ default: true }, { default: false });
    return super.create(data);
  }


}