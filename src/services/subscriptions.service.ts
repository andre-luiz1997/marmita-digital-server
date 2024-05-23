import { Injectable } from '@nestjs/common';
import { CreateSubscriptionUseCase, FindSubscriptionByIdUseCase, FindSubscriptionUseCase } from './use-cases';
import { CreateSubscriptionDTO } from 'core/dtos';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly findSubscriptionUseCase: FindSubscriptionUseCase,
    private readonly findSubscriptionByIdUseCase: FindSubscriptionByIdUseCase,
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
  ) {}

  create(data: CreateSubscriptionDTO) {
    return this.createSubscriptionUseCase.execute(data);
  }

  async findOneById(_id: any) {
    return this.findSubscriptionByIdUseCase.execute(_id);
  }

  async findOne(filter: any) {
    return this.findSubscriptionUseCase.execute(filter);
  }
}
