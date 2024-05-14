import { Injectable } from "@nestjs/common";
import { isEmpty } from "class-validator";
import { UseCase } from "core/base/use-case";
import { UserEntity } from "core/domain/entities";
import { CreateUserMapper } from "core/domain/mappers";
import { CreateUserDTO } from "core/dtos";
import { UserRepository } from "core/repositories/user.repository";
import { ValidationException } from "shared/exceptions";

@Injectable()
export class CreateUserUseCase implements UseCase<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(data: CreateUserDTO): Promise<UserEntity> {
    const mapper = new CreateUserMapper();
    if (isEmpty(data.email) && isEmpty(data.mobile_phone)) throw new ValidationException('Missing email or mobile_phone');
    const item = mapper.mapFrom(data);
    const user = await this.userRepository.create(item)
    return this.userRepository.findOneById(user._id);
  }
}