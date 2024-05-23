import { Injectable } from "@nestjs/common";
import { UseCase } from "core/base";
import { SubscriptionEntity } from "core/domain/entities";
import { SubscriptionRepository } from "core/repositories";

@Injectable()
export class FindSubscriptionUseCase implements UseCase<SubscriptionEntity> {
  constructor(
    private readonly repository: SubscriptionRepository,
  ) { }
  
  async execute(filter: any): Promise<SubscriptionEntity> {
    return this.repository.findOne(filter);
  }
}