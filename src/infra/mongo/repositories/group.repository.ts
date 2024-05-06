import type { DTO } from "@/shared/dto";
import type { BaseRepository } from "@/shared/repository";
import { Injectable } from "@nestjs/common";
import { Types, type Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PROVIDERS } from "@/constants";
import { RecordNotFoundException } from "@/application/exceptions";
import { Group } from "@/domain/entities";

@Injectable()
export class GroupMongoRepository implements BaseRepository<Group> {
  constructor(
    @InjectModel(PROVIDERS.GROUP) private model: Model<Group>
  ) {}

  create(data: DTO<Group>): Promise<Group> {
    if(!data._id) data._id = new Types.ObjectId();
    return this.model.create(data);
  }

  update(id: string, data: DTO<Group>): Promise<Group> {
    const user = this.model.findByIdAndUpdate(id, data, {new: true}).lean();
    if(!user) throw new RecordNotFoundException();
    return user;
  }

  delete(id: string): Promise<Group> {
    const user = this.model.findByIdAndUpdate(id, {
      deletedAt: true
    }, {new: true}).lean();
    if(!user) throw new RecordNotFoundException();
    return user;
  }

  findById(id: string): Promise<Group> {
    return this.model.findById(id).lean();
  }

  findOne(options?: any): Promise<Group> {
    return this.model.findOne(options).exec();
  }

  find(): Promise<Group[]> {
    return this.model.find().exec();
  }
}