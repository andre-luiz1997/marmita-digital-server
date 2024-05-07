import { RecordNotFoundException } from "@/shared/exceptions";
import { Entity, Repository } from "@/core/base";
import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";

@Injectable()
export class MongoRepository<T extends Entity> extends Repository<T> {
  constructor(
    protected model: Model<T>
  ) {
    super();
  }

  create(data: T): Promise<T> {
    if (!data._id) data._id = new Types.ObjectId();
    return this.model.create(data);
  }

  async update(_id: any, data: T): Promise<T> {
    const item = await this.model.findByIdAndUpdate(_id, data, { new: true }).lean() as T;
    if (!item) throw new RecordNotFoundException();
    return item;
  }

  async patch(_id: any, data: Partial<T>): Promise<T> {
    const item = await this.model.findByIdAndUpdate(_id, data, { new: true }).lean() as T;
    if (!item) throw new RecordNotFoundException();
    return item;
  }

  findOneById(_id: any): Promise<T> {
    return this.model.findById(_id).lean();
  }

  findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  findOne(filter: any): Promise<T> {
    return this.model.findOne(filter).exec();
  }

  findMany(filter: any): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async delete(_id: any): Promise<void> {
    const item = await this.model.findByIdAndUpdate(_id, {
      deletedAt: true
    }, { new: true }).lean();
    if (!item) throw new RecordNotFoundException();
    return;
  }
}