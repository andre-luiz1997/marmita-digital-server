import type { User } from "@/domain/entities/user";
import type { DTO } from "@/shared/dto";
import type { BaseRepository } from "@/shared/repository";
import { Injectable } from "@nestjs/common";
import { Types, type Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PROVIDERS } from "@/constants";
import { RecordNotFoundException } from "@/application/exceptions/recordnotfound.exception";

@Injectable()
export class UserMongoRepository implements BaseRepository<User> {
  constructor(
    @InjectModel(PROVIDERS.USER) private model: Model<User>
  ) {}

  create(data: DTO<User>): Promise<User> {
    if(!data._id) data._id = new Types.ObjectId();
    return this.model.create(data);
  }

  update(id: string, data: DTO<User>): Promise<User> {
    const user = this.model.findByIdAndUpdate(id, data, {new: true}).lean();
    if(!user) throw new RecordNotFoundException();
    return user;
  }

  delete(id: string): Promise<User> {
    const user = this.model.findByIdAndUpdate(id, {
      deletedAt: true
    }, {new: true}).lean();
    if(!user) throw new RecordNotFoundException();
    return user;
  }

  findById(id: string): Promise<User> {
    return this.model.findById(id).lean();
  }

  find(): Promise<User[]> {
    return this.model.find().exec();
  }
}