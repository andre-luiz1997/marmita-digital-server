import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { SubscriptionEntity } from "core/domain/entities";
import { SubscriptionRepository } from "core/repositories";

@Injectable()
export class FindSubscriptionByIdUseCase implements UseCase<SubscriptionEntity> {
  constructor(
    private readonly repository: SubscriptionRepository,
  ) { }
  
  async execute(_id: any): Promise<SubscriptionEntity> {
    return this.repository.findOneById(_id);
  }
}