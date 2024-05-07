import { Entity } from "./entity";

export abstract class Repository<T extends Entity> {
  abstract create(data: T): Promise<T>;
  abstract update(_id: any, data: T): Promise<T>;
  abstract patch(_id: any, data: Partial<T>): Promise<T>;
  abstract findOneById(_id: any): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(filter: any): Promise<T>;
  abstract findMany(filter: any): Promise<T[]>;
  abstract delete(_id: any): Promise<void>;
}