import { UserEntity } from "@/core/domain/entities/auth/user.entity";
import { UserRepository } from "@/core/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongoRepository } from "./mongo.repository";
import { ConflictException } from "shared/exceptions";
import { ENTITIES } from "@/constants";

@Injectable()
export class UserMongoRepository extends MongoRepository<UserEntity> implements UserRepository {
  constructor(
    @InjectModel(ENTITIES.USER) model: Model<UserEntity>
  ) {
    super(model);
  }

  async create(data: UserEntity): Promise<UserEntity> {
    console.log('🚀 ~ file: user-mongo.repository.ts:19 ~ UserMongoRepository ~ create ~ data 🚀 ➡➡', data);
    const existingUser = await this.findOne({ email: data.email, tenant: data.tenant?._id });
    if (existingUser) throw new ConflictException('user', 'email', data.email);
    return super.create(data);
  }

  findOneById(_id: any, omitPassword = true): Promise<UserEntity> {
    return this.model.findById(_id).select(`${omitPassword ? '-' : '+'}password`).lean();
  }

  findAll(omitPassword?: boolean): Promise<UserEntity[]>{
    return this.model.find().select(`${omitPassword ? '-' : '+'}password`).lean();
  }

  findOne(filter: any, omitPassword?: boolean): Promise<UserEntity> {
    return this.model.findOne(filter).select(`${omitPassword ? '-' : '+'}password`).lean();
  }

  findMany(filter: any, omitPassword?: boolean): Promise<UserEntity[]> {
    return this.model.find(filter).select(`${omitPassword ? '-' : '+'}password`).lean();
  }
}