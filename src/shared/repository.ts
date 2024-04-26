import type { DTO } from "./dto";

export interface BaseRepository<T> {
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
  findById(id: string): Promise<T>;
  find(): Promise<T[]>;
}