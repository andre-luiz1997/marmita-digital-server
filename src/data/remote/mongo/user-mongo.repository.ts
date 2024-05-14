import { UserEntity } from "@/core/domain/entities/auth/user.entity";
import { UserRepository } from "@/core/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Document } from "mongoose";
import { MongoRepository } from "./mongo.repository";
import { ConflictException } from "shared/exceptions";
import { ENTITIES } from "@/constants";
import { GROUPS } from "@/permissions";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { PaginationProps } from "shared/types";

@Injectable()
export class UserMongoRepository extends MongoRepository<UserEntity> implements UserRepository {
  constructor(
    // @ts-ignore
    @InjectModel(ENTITIES.USER) model: SoftDeleteModel<UserEntity>
  ) {
    super(model);
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const filter: FilterQuery<UserEntity> = { email: data.email, tenant: data.tenant?._id };
    if (data.group == GROUPS.TENANT_ADMIN) {
      filter.group = GROUPS.TENANT_ADMIN;
    }
    const existingUser = await this.findOne(filter);
    if (existingUser) throw new ConflictException('user', 'email', data.email);
    return super.create(data);
  }

  findOneById(_id: any, omitPassword = true): Promise<UserEntity> {
    return this.model.findById(_id).select(`${omitPassword ? '-' : '+'}password`).lean();
  }

  async findAll(_props?: PaginationProps & { omitPassword?: boolean }) {
    const { omitPassword = true, ...props } = _props ?? {};
    const query = this.model.find();
    query.select(`${omitPassword ? '-' : '+'}password`)
    if(props) this.preparePagination(query, props);
    return {
      data: await query.exec(),
      count: await this.model.countDocuments(query.getOptions())
    };
  }

  findOne(filter: any, omitPassword?: boolean): Promise<UserEntity> {
    return this.model.findOne(filter).select(`${omitPassword ? '-' : '+'}password`).lean();
  }

  findMany(filter: any, omitPassword?: boolean): Promise<UserEntity[]> {
    return this.model.find(filter).select(`${omitPassword ? '-' : '+'}password`).lean();
  }
}