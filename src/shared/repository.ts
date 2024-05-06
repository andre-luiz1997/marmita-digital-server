export interface BaseRepository<T> {
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
  findById(id: string): Promise<T>;
  findOne(options?: any, ...args: any): Promise<T>;
  find(options?: any, ...args: any): Promise<T[]>;
}