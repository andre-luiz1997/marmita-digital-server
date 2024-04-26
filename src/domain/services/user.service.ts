import { Inject, Injectable } from "@nestjs/common";
import type { BaseRepository } from "@/shared/repository";
import type { User } from "../entities/user";
import { SERVICES } from "@/constants";
import type { CreateUserDTO } from "@/application/dtos/users/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject(SERVICES.USER) private readonly repository: BaseRepository<User>
  ) { }

  async create(data: CreateUserDTO) {
    return this.repository.create(data);
  }

  async update(id: string, data: any) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async find() {
    return this.repository.find();
  }
}