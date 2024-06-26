import { RecordNotFoundException } from "@/shared/exceptions";
import { Entity, Repository } from "@/core/base";
import { Injectable } from "@nestjs/common";
import { Model, Types, Document, Query } from "mongoose";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";
import { PaginationProps } from "shared/types";

@Injectable()
export class MongoRepository<T extends Entity> extends Repository<T> {
  constructor(
    protected model: SoftDeleteModel<any>
  ) {
    super();
  }

  preparePagination(query: Query<any[], any, any, any, "find">, props: PaginationProps) {
    if (props.limit) query.limit(props.limit);
    if (props.skip) query.skip(props.skip);
    if (props.sortBy) {
      const sortObj: any = {};
      if (typeof props.sortBy === 'string') sortObj[props.sortBy] = props.sortOrder ?? -1;
      for (let index = 0; index < props.sortBy.length; index++) {
        const sortBy = props.sortBy[index];
        sortObj[sortBy] = props.sortOrder[index] ?? -1;
      }
      if (!Object.values(sortObj)?.length) sortObj['createdAt'] = -1;
      query.sort(sortObj);
    }
    if (props.filters) {
      props.filters.forEach(filter => {
        switch (filter.operator) {
          case 'LIKE': {
            query.where(filter.fields[0]).equals(filter.value);
            break;
          }
          case '%%': {
            query.where(filter.fields[0]).regex(new RegExp(`${filter.value}`, 'i'));
            break;
          }
          case '%_': {
            query.where(filter.fields[0]).regex(new RegExp(`^${filter.value}`, 'i'));
            break;
          }
          case '_%': {
            query.where(filter.fields[0]).regex(new RegExp(`${filter.value}$`, 'i'));
            break;
          }
          case 'IN': {
            const value = Array.isArray(filter.value) ? filter.value : [filter.value];
            query.where(filter.fields[0]).in(value);
            break;
          }
          case 'NOT IN': {
            const value = Array.isArray(filter.value) ? filter.value : [filter.value];
            query.where(filter.fields[0]).nin(value);
            break;
          }
          case 'IS NULL': {
            query.where(filter.fields[0]).exists(false).or([{ [filter.fields[0]]: null }]);
            break;
          }
          case 'IS NOT NULL': {
            query.where(filter.fields[0]).exists(true).or([{ [filter.fields[0]]: { $ne: null } }]);
            break;
          }
          case 'BETWEEN': {
            query.where(filter.fields[0]).gte(filter.value[0]).lte(filter.value[1]);
            break;
          }
          default:
            break;
        }
      });
    }
    return query;
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

  async updateMany(filter: any, data: Partial<T>): Promise<T[]> {
    await this.model.updateMany(filter, data, { new: true });
    return this.findMany(filter);
  }

  async patch(_id: any, data: Partial<T>): Promise<T> {
    const item = await this.model.findByIdAndUpdate(_id, data, { new: true }).lean() as T;
    if (!item) throw new RecordNotFoundException();
    return item;
  }

  findOneById(_id: any): Promise<T> {
    return this.model.findById(_id).lean();
  }

  async findAll(props?: PaginationProps) {
    return {
      data: await this.model.find().exec(),
      count: await this.model.countDocuments()
    };
  }

  findOne(filter: any): Promise<T> {
    return this.model.findOne(filter).lean();
  }

  findMany(filter: any): Promise<T[]> {
    return this.model.find(filter).lean();
  }

  async delete(_id: any): Promise<void> {
    const item = await this.model.softDelete({ _id });
    // const item = await this.model.findByIdAndUpdate(_id, {
    //   deletedAt: new Date()
    // }, { new: true }).lean();
    if (!item) throw new RecordNotFoundException();
    return;
  }
}